@terms @test1
Feature: Search for some terms and conditions

Scenario: Find fuel tAC
Given I go to terms and conditions
When I open fuel conditions
Then I should see fuel conditions doc