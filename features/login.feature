Feature: Login
    In order to be authenticated
    As a user
    I want to login using my credentials

    Scenario Outline: Login using invalid credentials
        Given I am a user
        When I login using <user> and <password>
        Then the status should be <status>

        Examples:
            | user      | password  | status |
            | admin     | wrongpass | 401    |
            | wronguser | hero      | 401    |

    Scenario Outline: Login using registered credentials
        Given I am a user
        When I login using <user> and <password>
        Then the status should be <status>
        Then the username should be <user>
        Then the name should be <name>
        Then the email should be <email>
        Then the superpower should be <superpower>
        Then the birth date should be <dateOfBirth>
        Then the admin status should be <isAdmin>
        Then the contract of the response should be as documented

        Examples:
            | user   | password | status | id | name                | email                   | superpower                         | dateOfBirth | isAdmin |
            | admin  | hero     | 200    | 1  | Amazing Admin       | a.admin@wearewaes.com   | Change the course of a waterfall.  | 1984-09-18  | true    |
            | dev    | wizard   | 200    | 2  | Zuper Dooper Dev    | zd.dev@wearewaes.com    | Debug a repellent factory storage. | 1999-10-10  | false   |
            | tester | maniac   | 200    | 3  | Al Skept-Cal Tester | as.tester@wearewaes.com | Voltage AND Current.               | 2014-07-15  | false   |


