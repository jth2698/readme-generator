// function to generate markdown for README
function generateMarkdown(data) {

  let licenseBadge;

  if (data.license == "mit") {
    licenseBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
  }
  if (data.license == "gnu") {
    licenseBadge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
  }
  if (data.license == "apache") {
    licenseBadge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
  }

  return `# ${data.title} ${licenseBadge}
## Description
${data.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contribution Guidelines](#contribution)
* [Testing](#testing) 
* [License](#license)
* [Questions](#questions)
  
## Installation
${data.installation}

## Usage
${data.usage}

## Contribution Guidelines
${data.contribution}

## Testing
${data.testing}

## License
${data.license}

## Questions
* <https://github.com/${data.github}>
* <${data.email}>`;
}

module.exports = generateMarkdown;
