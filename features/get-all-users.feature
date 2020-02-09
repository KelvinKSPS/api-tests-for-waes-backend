Feature: Get All Users
    In order to access any user information
    As a user
    I want to get all user information in the system

    Scenario: Getting all users as a non-admin
        Given I am a user with the role of non-admin
        When I request to get all users
        Then the status should be 403

    Scenario: Getting all users as a admin
        Given I am a user with the role of admin
        When I request to get all users
        Then the status should be 200
        Then the contract of the response should be as documented for each user
        Then the count of users should be 3
        When I sign up using valid information and username as newuser
        When I request to get all users
        Then the status should be 200
        Then the contract of the response should be as documented for each user
        Then the count of users should be 4

    Scenario Outline: Sign up and get all users
        Given I just signed up as a <role>
        When I request to get all users
        Then the status should be <status>

        Examples:
            | role      | status |
            | non-admin | 403    |
            | admin     | 200    |