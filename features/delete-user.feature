Feature: Delete
    In order to delete an account
    As a user
    I need to send all information for the user to confirm deletion

    Scenario: Sign Up and Remove User, and try removing the same user again
        Given I am a user wanting to be removed
        When I make the request to delete my information first time
        Then the status should be 200
        Then response should indicate the user was removed
        When I make the request to delete my information second time
        Then the status should be 404
        Then response should indicate the user was not found

    Scenario: Remove a user using invalid credentials
        Given I am a user with invalid credentials
        When I make the request to delete any information
        Then the status should be 401

    Scenario: Remove a user that does not exist
        Given I am an admin willing to remove a user that does not exist
        When I make the request to delete any information
        Then the status should be 404
        Then response should indicate the user was not found

    @putingDataInDatabase
    Scenario Outline: Remove a user missing parameters
        Given I am a user and my role is admin
        When I try to remove a user without passing parameter <missing parameter>
        Then the status should be <status>
        Examples:
            | missing parameter | status |
            | email             | 404    |
            | username          | 404    |


    @putingDataInDatabase
    Scenario Outline: User removes another user
        Given I am a user and my role is <role>
        When I try to remove a user which is <role from other user>
        Then the status should be <status>
        Then response should indicate the user was <expected response>

        Examples:
            | role      | role from other user | status | expected response                  |
            | admin     | admin                | 200    | removed                            |
            | admin     | non-admin            | 200    | removed                            |
            | non-admin | admin                | 403    | not removed due to unauthorization |
            | non-admin | non-admin            | 403    | not removed due to unauthorization |






