# Overview:

**Phorest Demo**

- Follows Workflow of $50, $100, $150 and other for both Send To Me and Send To Someone Else
- Validates Gift Card page content
- Validates Summary page content
- Validates Payment page content
- Validates success page content
- Validates functionality of Edit button on Summary page

# Installation:

**Visual Studio Code**

Download Visual Studio Code (Download) to use as your code editor. 

Install the following extensions in Visual Studio Code thereafter:

npm by egamma
Angular Snippets (Version 11) by John Papa
Code Runner
GitLens - Git supercharged by Eric Amodio
Visual Studio IntelliCode by Microsoft

**Node.js**

Download Node.js as your runtime environment. Installing Node.js will allow the installation of PowerShell. Node.js also installs npm, which will be necessary when installing Phorest Demo.

**Setup and install Cypress**

Follow the below steps for setup:
1. Create Empty Project Folder in your desired location
2. Open the folder in Visual Studio Code:
Visual Studio Code Menu > Navigate to File > Click on Open Folder > Choose the newly created Folder from Open Folder Wizard
3. Create package.json:
In order to create the package.json, open Terminal in Visual Studio Code Menu and type the command below:
```bash
npm init
```
Upon entering npm init in the terminal, it asks for a set of questions. Answer them or hit [Enter] [Enter] until it finishes. 
Finally, it asks – Is this OK? (yes). Then, hit [Enter].
Now the file named package.json is automatically created in the root folder of the project.
4. Install Cypress:
In the root Project Folder (CypressJavascript) > Terminal > type:
```bash
npm install cypress --save-dev
```

**Git**

Download Git as a version control system for tracking any changes made to the project, or for pulling it from the repository.

Once the above installations are complete, clone the Phorest Demo repository to your C:/ Drive and open the folder in VS Code.

**iFrame** 

To enable testing of iFrames, navigate to the below URL and follow instructions to add iFrame to commands.js:
https://gist.github.com/greg-hoarau/5e6b705ccd24b06a85ba45f226f20558

# Execution:

To open Cypress Window use the following command within the terminal in VS Code:
```bash
npx cypress open 
```
Run scripts via:
main.js

# Other Information:

**Structure**

Elements are stored within and imported from elements.js from within the support folder. Variables are stored within and imported from variables.js from within the support folder.

**Defects**

Below are details for each defect found, fails in run should correspond to this list:
1. First Name field does not display an error message for max character being exceeded, a required error when the field is cleared of all text, or an invalid input error for invalid input such as numbers.
2. Last Name field incurs the same defect as First Name field
3. When selecting Other radio, incur an error message such as Required when leaving the field blank. Then select another radio, such as 50. The error message remains displayed
4. If you exceed the character limit for Message for Recipient field when sending to someone else, the error message does not display as expected, it instead displays the code for an exceeding character limit error message
5. On the Summary page, select the Edit button. The user is returned to the initial Gift Card selection screen. It retains all information previously entered, and the checkout button is clickable. However, the radio previously selected is not actually checked.

**Emails**

Possible solution to validate emails have been received and the contents for those emails would be to utilize MailSlurp:
https://www.mailslurp.com/examples/cypress-js/


