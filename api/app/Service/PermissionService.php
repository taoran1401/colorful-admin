<?php


namespace App\Service;

use App\Model\Permission;
use App\Model\PermissionMenu;
use Hyperf\DbConnection\Db;
use Hyperf\Di\Annotation\Inject;
use Psr\Http\Message\ServerRequestInterface;
use Taoran\HyperfPackage\Core\AbstractController;
use function Taoran\HyperfPackage\Helpers\get_msectime;
use function Taoran\HyperfPackage\Helpers\set_save_data;


class PermissionService extends AbstractController
{
    /**
     * @Inject()
     * @var Permission
     */
    protected $permissionModel;

    /**
     * @Inject()
     * @var PermissionMenu
     */
    protected $permissionMenuModel;

    public function getList($params)
    {
        $list = $this->permissionModel->getList(['id', 'code', 'name', 'type', 'created_at', 'updated_at'], $params, function ($orm) use ($params) {
            //筛选
            if ($params['name'] != "") {
                $orm->where('name', 'like', "%{$params['name']}%");
            }

            if ($params['code'] != "") {
                $orm->where('code', 'like', "%{$params['code']}%");
            }

            $orm->with('menus');
            $orm->orderBy('id', 'DESC');
        });

        //重装数据
        $list->each(function ($item) {
            //组合菜单id
            $item->menu_ids = !empty($item->menus) ? $item->menus->pluck('id') : [];
            $item->menu_names = !empty($item->menus) ? $item->menus->pluck('name') : [];
            $item->type_text = \App\Model\Permission::$type[$item->type];
            unset($item->menus);
        });

        return $list;
    }

    public function getOne(int $id)
    {
        $data = $this->permissionModel->getOne(['*'], function ($orm) use ($id) {
            $orm->where('id', $id);
            $orm->with('menus');
        });
        //组合菜单id
        $data->menu_ids = !empty($data->menus) ? $data->menus->pluck('id') : [];
        unset($data->menus);
        return $data;
    }

    public function add($params)
    {
        try {
            //检查权限是否存在
            if (isset($params['code']) && $params['code'] != "") {
                $permission= $this->permissionModel->getOne(['*'], function ($query) use ($params) {
                    $query->where('code', $params['code']);
                });
                if ($permission) {
                    throw new \Exception("该权限已存在！");
                }
            }

            Db::beginTransaction();

            //添加
            $permissionModel = new \App\Model\Permission();
            set_save_data($permissionModel, [
                'name' => $params['name'],
                'code' => $params['code'],
                'type' => $params['type'],
                'created_at' => get_msectime(),
                'updated_at' => get_msectime(),
            ]);
            $permissionModel->save();

            //绑定菜单
            $this->bindPermissionMenu($permissionModel->id, $params['menu_ids']);

            Db::commit();
        } catch (\Exception $e) {
            Db::rollBack();
            throw new \Exception($e->getMessage());
        }
    }

    public function update(int $id, $params)
    {
        try {
            //检查权限是否存在
            $permission = $this->permissionModel->getOneById($id);


            Db::beginTransaction();

            //添加
            set_save_data($permission, [
                'name' => $params['name'],
                'code' => $params['code'],
                'type' => $params['type'],
                'updated_at' => get_msectime(),
            ]);
            $permission->save();

            //绑定菜单
            $this->bindPermissionMenu($permission->id, $params['menu_ids'], true);

            Db::commit();
        } catch (\Exception $e) {
            Db::rollBack();
            throw new \Exception($e->getMessage());
        }
    }

    public function destroy(int $id)
    {

        try {
            //获取权限
            $permission = $this->permissionModel->getOneById($id);

            Db::beginTransaction();

            //删除
            $permission->is_on = 0;
            $permission->save();

            //删除对应菜单关系
            $this->permissionMenuModel->where('permission_id', $permission->id)->delete();

            Db::commit();
        } catch (\Exception $e) {
            Db::rollBack();
            throw new \Exception($e->getMessage());
        }
    }

    /**
     * 绑定菜单
     *
     * @param $permission_id
     * @param $menu_ids
     * @param bool $is_update
     * @return bool
     */
    public function bindPermissionMenu($permission_id, $menu_ids, $is_update = false)
    {
        if (!(is_array($menu_ids) && count($menu_ids) > 0)) {
            return true;
        }

        if ($is_update == true) {
            //更新操作，先清除旧的绑定信息
            $this->permissionMenuModel->where('permission_id', $permission_id)->delete();
        }

        $insert_data = [];
        foreach ($menu_ids as $key => $val) {
            $insert_data[] = [
                'permission_id' => $permission_id,
                'menu_id' => $val,
            ];
        }
        $this->permissionMenuModel->insert($insert_data);
    }
}