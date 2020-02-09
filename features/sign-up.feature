Feature: Sign Up
    In order to create an account
    As a user
    I want to register all mandatory information for the account creation

    @putingDataInDatabase
    Scenario Outline: Sign Up, login, check contract and each value
        Given I am a user wanting to sign up
        When I sign up using the following parameters: <user> <password> <name> <email> <superpower> <isAdmin> <dateOfBirth>
        Then the status should be <status>
        When I login using <user> and <password>
        Then the status should be 200
        Then the username should be <user>
        Then the name should be <name>
        Then the email should be <email>
        Then the superpower should be <superpower>
        Then the birth date should be <dateOfBirth>
        Then the admin status should be <isAdmin>
        Then the contract of the response should be as documented

        Examples:
            | user | password | status | name             | email              | superpower | dateOfBirth | isAdmin |
            | sdet | password | 201    | SoftDevTest      | sdet@wearewaes.com | Develop    | 1984-09-18  | true    |
            | qa   | password | 201    | QualityAssurance | qa@wearewaes.com   | Test       | 1999-10-10  | false   |




    @putingDataInDatabase
    Scenario Outline: Sign Up and try signing up again using same username
        Given I am a user wanting to sign up
        When I sign up using valid information and username as <username>
        Then the status should be <status>
        Then the contract of the response should be as documented
        When I sign up using valid information and username as <username>
        Then the status should be <forbidden status>
        Then the message received should be <message>

        Examples:
            | username  | status | forbidden status | message                                                               |
            | validuser | 201    | 403              | Username or email already registered. Please select different values. |

    @putingDataInDatabase
    Scenario Outline: Remove a registered user and signing up again the same user
        Given I am a user already signed up as <username>
        When I remove the username <username> and sign up again
        Then the status should be <status>
        Then the contract of the response should be as documented

        Examples:
            | username  | status |
            | validuser | 201    |

    @putingDataInDatabase
    Scenario Outline: Signing Up using invalid formats
        Given I am a user wanting to sign up
        When I sign up using <parameter> as a <type>
        Then the status should be <status>

        Examples:
            | parameter   | type         | status |
            | isAdmin     | string       | 400    |
            | isAdmin     | number       | 400    |
            | isAdmin     | null         | 400    |
            | dateOfBirth | invalid date | 400    |
            | dateOfBirth | number       | 400    |
            | dateOfBirth | null         | 400    |
            | username    | empty string | 400    |
            | username    | null         | 400    |
            | email       | empty string | 400    |
            | email       | null         | 400    |


    @putingDataInDatabase
    Scenario Outline: Sign Up and try signing up again using same email
        Given I am a user wanting to sign up
        When I sign up using valid information and email as <email>
        Then the status should be <status>
        Then the contract of the response should be as documented
        When I sign up using valid information and email as <email>
        Then the status should be <forbidden status>
        Then the message received should be <message>

        Examples:
            | email            | status | forbidden status | message                                                               |
            | qa@wearewaes.com | 201    | 403              | Username or email already registered. Please select different values. |



    @putingDataInDatabase
    Scenario Outline: Information Missing
        Given I am a user wanting to sign up
        When I sign up missing the parameter <missing parameter>
        Then the status should be <status>

        Examples:
            | missing parameter | status |
            | name              | 400    |
            | email             | 400    |
            | superpower        | 400    |
            | dateOfBirth       | 400    |
            | isAdmin           | 400    |
            | password          | 400    |
            | username          | 400    |


