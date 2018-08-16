<?php $__env->startComponent('mail::message'); ?>

<?php if(! empty($greeting)): ?>
# <?php echo e($greeting); ?>

<?php else: ?>
<?php if($level == 'error'): ?>
# <?php echo app('translator')->getFromJson('Whoops!'); ?>
<?php else: ?>
# <?php echo app('translator')->getFromJson('Xin chào!'); ?>
<?php endif; ?>
<?php endif; ?>


<?php $__currentLoopData = $introLines; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $line): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
<?php echo e($line); ?>


<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>


<?php if(isset($actionText)): ?>
<?php
    switch ($level) {
        case 'success':
            $color = 'green';
            break;
        case 'error':
            $color = 'red';
            break;
        default:
            $color = 'blue';
    }
?>
<?php $__env->startComponent('mail::button', ['url' => $actionUrl, 'color' => $color]); ?>
<?php echo e($actionText); ?>

<?php echo $__env->renderComponent(); ?>
<?php endif; ?>


<?php $__currentLoopData = $outroLines; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $line): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
<?php echo e($line); ?>


<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>


<?php if(! empty($salutation)): ?>
<?php echo e($salutation); ?>

<?php else: ?>
<?php echo app('translator')->getFromJson('Trân trọng'); ?>,<br>ABC Hotel<!--<?php echo e(config('app.name')); ?>-->
<?php endif; ?>


<?php if(isset($actionText)): ?>
<?php $__env->startComponent('mail::subcopy'); ?>
<?php echo app('translator')->getFromJson(
    "Nếu bạn không nhấp vào nút \":actionText\" được, Xin vui lòng copy link bên dưới\n".
    'vào trong trình duyệt của bạn: [:actionURL](:actionURL)',
    [
        'actionText' => $actionText,
        'actionURL' => $actionUrl
    ]
); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php echo $__env->renderComponent(); ?>
