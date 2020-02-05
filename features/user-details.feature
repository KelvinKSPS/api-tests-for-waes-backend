Feature: Get User Details
    In order to access any user information
    As a user
    I want to get the user information

    Scenario Outline: Valid Users
        Given I want to see the details from a user
        When I access the data by using <user>
        Then the status should be <status>
        Then the username should be <user>
        Then the name should be <name>
        Then the email should be <email>
        Then the superpower should be <superpower>
        Then the birth date should be <dateOfBirth>
        Then the admin status should be <isAdmin>

        Examples:
            | user  | status | id | name          | email                 | superpower                        | dateOfBirth | isAdmin |
            | admin | 200    | 1  | Amazing Admin | a.admin@wearewaes.com | Change the course of a waterfall. | 1984-09-18  | true    |



    Scenario Outline: Invalid Users
        Given I want to see the details from a user
        When I access the data by using <user>
        Then the status should be <status>

        Examples:
            | user        | status |
            | invaliduser | 404    |
            |             | 404    |
