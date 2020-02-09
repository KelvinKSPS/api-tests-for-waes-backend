Feature: Get User Details
    In order to access any user information
    As a user
    I want to get the user information

    Scenario Outline: Valid Users
        Given I want to see the details from a user
        When I request details from user <user>
        Then the status should be <status>
        Then the username should be <user>
        Then the name should be <name>
        Then the email should be <email>
        Then the superpower should be <superpower>
        Then the birth date should be <dateOfBirth>
        Then the admin status should be <isAdmin>
        Then the contract of the response should be as documented

        Examples:
            | user   | status | id | name                | email                   | superpower                         | dateOfBirth | isAdmin |
            | admin  | 200    | 1  | Amazing Admin       | a.admin@wearewaes.com   | Change the course of a waterfall.  | 1984-09-18  | true    |
            | dev    | 200    | 2  | Zuper Dooper Dev    | zd.dev@wearewaes.com    | Debug a repellent factory storage. | 1999-10-10  | false   |
            | tester | 200    | 3  | Al Skept-Cal Tester | as.tester@wearewaes.com | Voltage AND Current.               | 2014-07-15  | false   |



    Scenario Outline: Invalid Users
        Given I want to see the details from a user
        When I request details from user <user>
        Then the status should be <status>

        Examples:
            | user        | status |
            | invaliduser | 404    |
            |             | 404    |


