<?php

namespace App;

enum MessageRole: string
{
    case USER = 'user';
    case ASSISTAND = 'assistant';
    case SYSTEM = 'system';
}
