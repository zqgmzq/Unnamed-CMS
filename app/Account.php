<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Account extends Authenticatable
{
    use Notifiable;

    protected $connection = 'auth';

    protected $table = 'account';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'password', 'email',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'sha_pass_hash',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating( function ($model) {
            $model->attributes['joindate'] = $model->freshTimestamp();
        });
    }

    public function getRememberTokenName()
    {
      return null;
    }


    protected function setPasswordAttribute($value)
    {
        $this->attributes['sha_pass_hash'] = sha1($this->attributes['username'].':'.$value);
    }

}