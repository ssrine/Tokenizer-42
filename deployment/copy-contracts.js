const fs = require('fs');
const path = require('path');

const contractsSrcDir = path.join(__dirname, '../code/contracts');
const contractsDestDir = path.join(__dirname, './contracts');
const testSrcDir = path.join(__dirname, '../code/test');
const testDestDir = path.join(__dirname, './test');

function copyDirectory(srcDir, destDir, label) {
  // Create destination if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Read source files
  const files = fs.readdirSync(srcDir);
  let copiedCount = 0;

  files.forEach(file => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    const stats = fs.lstatSync(srcFile);

    // Skip symlinks (they don't work well on all systems)
    if (stats.isSymbolicLink()) {
      return;
    }

    // Copy only files (not directories)
    if (stats.isFile()) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`   ✓ ${file}`);
      copiedCount++;
    }
  });

  return copiedCount;
}

// Main execution
console.log('\n📋 Setting up contracts and tests...\n');

try {
  console.log('📂 Contracts:');
  const contractCount = copyDirectory(contractsSrcDir, contractsDestDir, 'Contracts');
  console.log(`   Copied ${contractCount} file(s)\n`);

  console.log('📂 Tests:');
  const testCount = copyDirectory(testSrcDir, testDestDir, 'Tests');
  console.log(`   Copied ${testCount} file(s)\n`);

  console.log('✅ Setup complete! Files ready for Hardhat.\n');
  process.exit(0);
} catch (error) {
  console.error('\n❌ Error during setup:');
  console.error(`   ${error.message}\n`);
  process.exit(1);
}
