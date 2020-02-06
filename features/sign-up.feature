Feature: Sign Up
    In order to create an account
    As a user
    I want to register all mandatory information for the account creation

    Scenario Outline: Sign Up and try signing up again
        Given I am a user wanting to sign up
        When I sign up using valid information and username as <username>
        Then the status should be <status>
        Then the contract of the response should be as documented
        When I sign up using valid information and username as <username>
        Then the status should be <status for signing up again>

        Examples:
            | username  | status | status for signing up again |
            | validuser | 201    | 403                         |

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


