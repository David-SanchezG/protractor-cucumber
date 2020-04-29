@esca @test1
Feature: Search for an escapade

Scenario: Find escapade
Given I search for an escapade
When I select an option from belgium
Then I should see search results list
