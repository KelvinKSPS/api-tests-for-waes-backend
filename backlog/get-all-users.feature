
    @putingDataInDatabase
    Scenario: Removing users and getting all users
        Given I am a user with the role of admin
        When I remove all users
        When I request to get all users
        Then the status should be 401
        When I re-create the users in database
        When I request to get all users
        Then the count of users should be 3