<?php

namespace Tests\Feature\Activity;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreateActivityTest extends TestCase
{
    use WithFaker;

    public function setUp(): void
    {
        parent::setUp();

        $this->setBaseRoute('activity');
        $this->setBaseModel('App\Models\Activity');
    }

    /** @test */
    public function a_user_can_create_an_activity()
    { 
        $this->signIn();

        $this->create();
    }

    /** @test */
    public function unauthenticated_user_cannot_create_a_activity()
    { 
        $this->create();
    }

    /** @test */
    public function a_activity_requires_an_activity_type()
    { 
        $this->signIn();
        $this->post(route('activity.store'), [])->assertSessionHasErrors('type');
    }
}
