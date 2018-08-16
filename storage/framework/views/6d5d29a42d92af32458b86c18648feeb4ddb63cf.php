<div id="background" style="background: black; text-align: center;">
    <div id="content" style="background: white;">
        <img src="http://www.hotel-r.net/im/hotel/no/abc-hotel-15.jpg" alt="">
        <p>
            <?php $__currentLoopData = $mail; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $m): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                Hello $m->user->name, <br><br>

                We have received a request to reset password at ABC Hotel. <br><br>

                In order to change your password, click the link below: <br><br>

                <a href="http://hotel.local/user/reset/$m->reset->token">Reset My Password</a> <br><br>

                If you have not made any password reset request, 
                it is likely that another user entered your email address by mistake and you can simply disregard this email.

                Thank you!
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </p>
    </div>
</div>