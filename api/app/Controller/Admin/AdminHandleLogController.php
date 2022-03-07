<?php

declare(strict_types=1);

namespace App\Controller\Admin;

use App\Service\AdminHandleLogService;
use Hyperf\Di\Annotation\Inject;

/**
 * 操作日志
 */
class AdminHandleLogController extends \Taoran\HyperfPackage\Core\AbstractController
{
    /**
     * @Inject()
     * @var AdminHandleLogService
     */
    protected $adminHandleLogService;

    public function index()
    {
        //接收参数
        $params = $this->verify->requestParams([
            ['user_id', ""],
            ['desc', ""],
            ['is_all', 0]
        ], $this->request);

        $list = $this->adminHandleLogService->getList($params);

        return $this->responseCore->success($list);
    }
}
