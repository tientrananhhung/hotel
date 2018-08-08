<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mail</title>
</head>
<body>
    <form action="mail" method="post">

        <?php echo e(csrf_field()); ?>


        <div>
            <label class="email">Your name</label>
            <input type="text" name="name" placeholder="Your name">
        </div>
        <div>
            <label class="email">Your email</label>
            <input type="email" name="email" placeholder="Your email">
        </div>
        <div>
            <label class="email">Comments</label>
            <textarea name="comment" id="comment" rows="5"></textarea>
        </div>
        <div class="send">
            <button type="submit">Send</button>
        </div>
    </form>
</body>
</html>