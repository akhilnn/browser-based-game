# SLOT MACHINE
Project 1 (Browser-Based Game)


## Background

A slot machine is a gambling machine which relies on chance to determine a win or loss. The machine takes credits or coins as input and outputs a scaled amount of coins if a certain "win" condition is met. There are usually three or more reels, which depict fruits or other popular symbols.

## Getting Started

- Link to deployed game:
- [Add any instructions]


## Pseudocode for Slot Machine Browser Game

1. Define required constants
	1. Define a SYMBOLS object that defines the symbols that will be on each reel.
	1. Define the sets of three symbols that will scale the value of a bet and store as an object property

2. Define required variables used to track the state of the game
	2. Define an array to represent each of the three active symbols on the reels
	2. Define a variable to keep track of a user’s credits (money)
	2. Define variables to store the player's betting options (1 CR per line, 5 CR per line, one bet line, three bet lines)

3. Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
	3. Store each of the elements within the grid that will reflect each bet line on the slot machine

4. Upon loading the app should:
	4. Initialize the state variables
		4. Initialize each of the three arrays to a starting value representing the starting symbol
			4. Initialize by running a random number generator (randReel function) to select the array elements to display
		4. Initialize the user’s credits to 100
	4. Render those values to the page
		4. Render the slot machine:
			4. Display a symbol/number to each of the 9 elements that will be displayed on the page.
			4. Animate the selection of the numbers in each reel
			4. Update the CREDITS REMAINING to the current credits value
		4. Render message:
			4. Display message “User is out of credits” if credits <= 0.
	4. Wait for the user to click GAMBLE! to start game

5. Handle a player clicking the GO! button to start the slot machine round
	5. Check that the User’s total credits inserted are > 0.
		5. If not, the render function will handle displaying a message.
		5. The render function will also disable the GO! button.
	5. Trigger a randReel function three times
		5. Randomly select an array index to determine which numbers/symbols are “active” on each of the reels
	5. Trigger a calcReward function:
		5. Calculate the reward based on the “Bet Table” for each of line of the reels
			5. Trigger an isEqual function (for each selected row) that checks if all the elements in a given row are equal
			5. Scale the value of the inputted rewards based on the “pay table” and update current credits of user
		5. Update the total credits of the user
	5. Render the board after all states have been updated

6. Handle a player clicking on the Credits per line and Bet line option buttons:
	6. Button disable criteria:
		6. If the user has <= 0 credits, disable all buttons. 
		6. If the user has 1-2 credits, disable the 5 credits per line and 3 lines buttons.
		6. If the user has 3-4 credits, disable the 5 credits per line button.
		6. if the user has 5 or more credits, enable all buttons.
	6. Set the appropriate variables based on the lines selected and credits per line allocated
	6. Render the slot machine after all states have been updated

7. Handle a player clicking the replay button:
	7. Do steps 4.1 (initialize the state variables) and 4.2 (render) again


## User Stories

1. As a player, I want to be able to select the lines & bet amounts and start a game.
2. As a player, I want to be able to play multiple games to increase my winnings.
3. As a player, I want to be able to see the resulting symbols/numbers displayed to confirm a win/loss.
4. As a player, I want to be able to know when I can no longer play (do not have sufficient credits).


## Wireframe of Main Screen

- [Add wireframe here, check image size]

## Screenshots of Game

- [Add screenshots]

## Technologies Used

- HTML5
- CSS3
- JavaScript

## Next Steps

- Make the game responsive to mobile devices
- Add scrolling animation to the reels

