Feature: Create Account on booking.com
    Scenario: Account creation
    Given I am in Sign Up page
    When I enter valid user email
        And first click on "Get started" button
        And I enter valid password
        And click on "Create account" button
        And main page is opened
        And I click on “My Dashboard” button under account menu
    Then “My Dashboard” page is opened
        And correct value is prefilled in email verification placeholder  //based on registered email
