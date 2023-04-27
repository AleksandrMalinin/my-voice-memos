# My voice memos
Web application that enables users to create memos using voice or keyboard input.

<img width="1300" alt="Screenshot 2023-04-27 at 18 00 10" src="https://user-images.githubusercontent.com/25110894/234936027-fb0df0b8-71b3-4ccc-b304-edab76a618b4.png">

## Interface description:

A simple, bright and intuitive application interface consists of a form for creating and editing memos - input field for the memo title and textarea fot content, with corresponding text placeholders, a block with control elements, and a list of memos grouped on the right side of the screen. 

The memo editing form is universal and allows for both creating new memos and editing existing ones (by clicking on a memo in the list). Both fields are required, and if a user leaves one of them empty, a native prompt appears indicating that the field must be filled.

All data and changes to memos are saved in localStorage. 

If a user's browser does not support SpeechRecognition, an alert will be displayed when attempting to record a memo, but creating memos using the keyboard will still be available. 

Voice recording is done by pressing the Record Voice button, which changes to Stop recording when recording starts. To make it clear that the recording is in progress, the button changes color to a more accentuated one, and a corresponding animated element becomes visible. During recording, the memo save and copy functions become unavailable to avoid possible errors in user logic. 

The text field is updated with a slight delay when recording voice. When editing a memo using voice, the text is not overwritten but updated. 

All interactive elements have states to make the user experience simpler and more intuitive.

**Summary of available features:**

- creating (using keyboard or voice)
- editing (using keyboard or voice)
- saving memos to localstorage
- copying memo text
- ability to clear memo text field
- deletion

## 🚀 How to run

```sh
npm install
npm run start
```
