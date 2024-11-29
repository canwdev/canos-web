// version-check.js

const versionCheck = () => {
  console.log('Node.js version:', process.version)
  console.log('Node module version:', process.versions.modules)
  console.log('Electron version:', process.versions.electron)
}

module.exports = {
  versionCheck
}