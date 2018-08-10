<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Dang Nhap</title>
</head>
<body>
    <form action="{{ url('/login') }}" method="post">

        <input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}"/>
        
        <label for="">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter email" /><br>
        <label for="">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter password" /><br>
        <input type="submit" value="Login">
    </form>
</body>
</html>