<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResetPasswordMailable extends Mailable
{
    use Queueable, SerializesModels;

    protected $reset;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($reset)
    {
        //
        $this->reset = $reset;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // return $this->view('view.name');
        return $this->subject('Password Reset at ABC Hotel')->view('mailreset')->with('mail', $this->reset);
    }
}
