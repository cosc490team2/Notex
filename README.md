![Logo](pics/notex_back.png)
# Notex
Notex is an innovative and decentralized note-sharing platform designed specifically for students. It is currently running on the Sepolia TestNet and offers its users a unique way to share their notes with their peers while also incentivizing them to engage in the process. The platform has its own cryptocurrency called "NTX", which is minted for students who publish their notes on the platform and review their peers' notes before publishing. This creates a self-sustaining ecosystem where students are rewarded for contributing to the platform's growth and quality. With its focus on collaboration and incentivization, Notex has the potential to revolutionize the way students share and learn from each other's notes.

### Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)

<a id="Installation"></a>
### Installation
To install Notex, you will need to have Node.js and npm installed on your computer. Here is the link to install: https://nodejs.org/en/download
Once you have those installed, follow these steps:

1. Clone the repository to your local machine using the following command:
```bash
git clone https://github.com/cosc490team2/Notex.git
```
2. Change into the project directory:
```bash
cd Notex
```
3. Install the dependencies:

```bash
npm init -y
npm i @metamask/onboarding
npm i express
npm i fs
npm i moralis
nps i multer
npm i @moralisweb3/common-evm-utils
npm i alert
npm i body-parser
npm i parcel -g

```
<a id = "Usage"></a>
### Usage
To use Notex, run the following command:
```bash
parcel indexzee.html
```
This will start the app on your local machine, and you can access it by opening your web browser and navigating to http://localhost:1234.

Once you're in, you can connect your MetaMask wallet and will then be redirected to the main page. The main page contains all the recent notes published 
as well as a few buttons to navigate to the "About", "Upload", and "Review" sections. Your current NXT balance will also be displayed on the top right corner. Right next to the NXT balance is a search bar for looking up specific files.

<a id = "License"></a>
### License
Notex is licensed under the MIT license. See LICENSE for more information.
