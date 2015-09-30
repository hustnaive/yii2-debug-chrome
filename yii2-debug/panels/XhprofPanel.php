<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace yii\debug\panels;

use yii\debug\models\search\Xhprof;
use Yii;
use yii\debug\Panel;
use yii\helpers\ArrayHelper;

/**
 * Debugger panel that collects and displays xhprof profiling data.
 *
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class XhprofPanel extends Panel
{
    private $_models = [];

    /**
     * @inheritdoc
     */
    public function getName()
    {
        return 'Xhprof';
    }

    public function getSummary()
    {
        return Yii::$app->view->render('panels/xhprof/summary.php', [
            'panel' => $this,
            'active' => !empty($this->data),
            'callCount' => count($this->data)
        ]);
    }

    /**
     * @inheritdoc
     */
    public function getDetail()
    {
        $searchModel = new Xhprof();
        $dataProvider = $searchModel->search(Yii::$app->request->getQueryParams(), $this->getModels());
        return Yii::$app->view->render('panels/xhprof/detail.php', [
            'panel' => $this,
            'dataProvider'=>$dataProvider,
            'searchModel'=>$searchModel
        ]);
    }


    /**
     * @inheritdoc
     */
    public function save()
    {
        $headers = \Yii::$app->request->getHeaders();
        if( function_exists('xhprof_disable') && $headers['xhprof-enabled'] ) {
            $data = xhprof_disable();
        }
        return isset($data) && $data !== null ? $data : [];
    }

    public function getModels()
    {
        if(!$this->_models){
            $t_ct = $t_wt = $t_cpu = $t_mu = $t_pmu = 0;
            $this->data = empty($this->data)?[]:$this->data;
            foreach($this->data as $fn => $data){
                $fn = explode('==>', $fn);
                $function = isset($fn[1]) ? $fn[1] : $fn[0];
                $parent = isset($fn[1]) ? $fn[0] : null;
                $data['fn']= $function;
                $t_ct += $data['ct'];
                if(isset($this->_models[$function])){
                    $existingData = $this->_models[$function];
                    $this->_models[$function] = [
                        'fn'=>$function,
                        'ct'=>$existingData['ct']+$data['ct'],
                        'wt'=>$existingData['wt']+$data['wt'],
                        'cpu'=>$existingData['cpu']+$data['cpu'],
                        'mu'=>$existingData['mu']+$data['mu'],
                        'pmu'=>$existingData['pmu']+$data['pmu'],
                        'parents'=>$existingData['parents']
                    ];
                    $this->_models[$function]['parents'][] = $parent;
                } else {
                    $this->_models[$function] = $data;
                    $this->_models[$function]['parents'] = [$parent];
                }
                if($parent === null){
                    $t_wt = $data['wt'];
                    $t_cpu = $data['cpu'];
                    $t_mu = $data['mu'];
                    $t_pmu = $data['pmu'];
                }
            }
            
            foreach($this->_models as $f => $model){
                $this->_models[$f]['w_ct'] = ($model['ct'] / $t_ct);
                $this->_models[$f]['w_wt'] = ($model['wt'] / $t_wt);
                $this->_models[$f]['w_cpu'] = ($model['cpu'] / $t_cpu);
                $this->_models[$f]['w_mu'] = ($model['mu'] / $t_mu);
                $this->_models[$f]['w_pmu'] = ($model['pmu'] / $t_pmu);
            }
        }
        return $this->_models;
    }

    public function getModel($fn)
    {
        return ArrayHelper::getValue($this->getModels(), $fn);
    }
}

