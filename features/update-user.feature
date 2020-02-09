Feature: Update User
    In order to update the account
    As a user
    I need to send all information for updating

    Scenario Outline: Sign up and update each parameter, login and check the parameter in the other endpoint
        Given I am <role> user signed up with parameter <parameter> as <value>
        When I request to update the parameter <parameter> to <new value>
        Then the status should be <status>
        Then the contract of the response should be as documented
        Then the parameter <parameter> should be <new value>
        When I login
        Then the status should be <status>
        Then the contract of the response should be as documented
        Then the parameter <parameter> should be <new value>

        Examples:
            | parameter   | role      | value      | new value         | status |
            | name        | admin     | oldName    | updatedName       | 200    |
            | name        | non-admin | oldName    | updatedName       | 200    |
            | email       | non-admin | oldEmail   | updated@email.com | 200    |
            | email       | admin     | oldEmail   | updated@email.com | 200    |
            | superpower  | non-admin | oldPower   | updatedPower      | 200    |
            | superpower  | admin     | oldPower   | updatedPower      | 200    |
            | dateOfBirth | non-admin | 2000-10-10 | 1990-10-10        | 200    |
            | dateOfBirth | admin     | 2000-10-10 | 1990-10-10        | 200    |
            | isAdmin     | non-admin | false      | true              | 200    |
            | isAdmin     | admin     | true       | false             | 200    |


    Scenario Outline: Sign up, update password, successfully new login and old login failure
        Given I am <role> user signed up with parameter <parameter> as <old value>
        When I request to update the parameter <parameter> to <new value>
        Then the status should be <status>
        Then the contract of the response should be as documented
        Then the parameter <parameter> should be <new value>
        When I login with password as <new value>
        Then the status should be <status>
        When I login with password as <old value>
        Then the status should be <failed status>

        Examples:
            | parameter | role      | old value | new value | status | failed status |
            | password  | non-admin | oldPass   | newPass   | 200    | 401           |
            | password  | admin     | oldPass   | newPass   | 200    | 401           |


    @putingDataInDatabase
    Scenario Outline: Update using invalid formats
        Given I just signed up as a <role>
        When I request to change type of the parameter <parameter> to the type of <type>
        Then the status should be <status>

        Examples:
            | role      | parameter   | type         | status |
            | admin     | isAdmin     | string       | 400    |
            | admin     | isAdmin     | number       | 400    |
            | admin     | isAdmin     | null         | 400    |
            | admin     | dateOfBirth | invalid date | 400    |
            | admin     | dateOfBirth | number       | 400    |
            | admin     | dateOfBirth | null         | 400    |
            | admin     | id          | empty string | 400    |
            | admin     | id          | null         | 400    |
            | admin     | email       | empty string | 400    |
            | admin     | email       | null         | 400    |
            | admin     | name        | null         | 400    |
            | admin     | superpower  | null         | 400    |
            | non-admin | isAdmin     | string       | 400    |
            | non-admin | isAdmin     | number       | 400    |
            | non-admin | isAdmin     | null         | 400    |
            | non-admin | dateOfBirth | invalid date | 400    |
            | non-admin | dateOfBirth | number       | 400    |
            | non-admin | dateOfBirth | null         | 400    |
            | non-admin | id          | empty string | 400    |
            | non-admin | id          | null         | 400    |
            | non-admin | email       | empty string | 400    |
            | non-admin | email       | null         | 400    |
            | admin     | name        | null         | 400    |
            | admin     | superpower  | null         | 400    |


    @putingDataInDatabase
    Scenario Outline: Update missing information
        Given I just signed up as a user
        When I update missing the parameter <missing parameter>
        Then the status should be <status>

        Examples:
            | missing parameter | status |
            | id                | 400    |
            | name              | 400    |
            | email             | 400    |
            | superpower        | 400    |
            | dateOfBirth       | 400    |
            | isAdmin           | 400    |
            | password          | 400    |
            | username          | 400    |


 @putingDataInDatabase
    Scenario Outline: User updates another user
        Given I am a user and my role is <role>
        When I try to update a user which is <role from other user>
        Then the status should be <status>

        Examples:
            | role      | role from other user | status | expected response                  |
            | admin     | admin                | 200    | removed                            |
            | admin     | non-admin            | 200    | removed                            |
            | non-admin | admin                | 403    | not removed due to unauthorization |
            | non-admin | non-admin            | 403    | not removed due to unauthorization |

    Scenario: User updates removed user
        Given I am a user and my role is admin
        When I try to update a deleted user
        Then the status should be 404
