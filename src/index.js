import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PACKAGE_ROOT = join(__dirname, '..');

const SKILLS = [
  'midnight-compact-guide',
  'midnight-sdk-guide',
  'midnight-infra-setup',
  'midnight-deploy',
  'midnight-test-runner'
];

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  dim: '\x1b[2m'
};

function log(msg, color = '') {
  console.log(`${color}${msg}${COLORS.reset}`);
}

function showBanner() {
  log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ${COLORS.cyan}midnight-agent-skills${COLORS.reset}  ${COLORS.dim}v1.0.0${COLORS.reset}                               ║
║   ${COLORS.dim}AI Agent Skills for Midnight Network${COLORS.reset}                  ║
║                                                           ║
║   ${COLORS.dim}By Webisoft Development Labs${COLORS.reset}                          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);
}

function showHelp() {
  showBanner();
  log(`
${COLORS.bright}USAGE${COLORS.reset}
  npx midnight-agent-skills <command> [options]

${COLORS.bright}COMMANDS${COLORS.reset}
  ${COLORS.cyan}init${COLORS.reset}              Initialize skills in current directory
  ${COLORS.cyan}init <dir>${COLORS.reset}        Initialize skills in specified directory
  ${COLORS.cyan}list${COLORS.reset}              List all available skills
  ${COLORS.cyan}add <skill>${COLORS.reset}       Add a specific skill
  ${COLORS.cyan}help${COLORS.reset}              Show this help message

${COLORS.bright}EXAMPLES${COLORS.reset}
  ${COLORS.dim}# Add all skills to current project${COLORS.reset}
  npx midnight-agent-skills init

  ${COLORS.dim}# Add skills to a specific directory${COLORS.reset}
  npx midnight-agent-skills init ./my-midnight-project

  ${COLORS.dim}# Add only the compact guide skill${COLORS.reset}
  npx midnight-agent-skills add midnight-compact-guide

  ${COLORS.dim}# List available skills${COLORS.reset}
  npx midnight-agent-skills list

${COLORS.bright}SKILLS${COLORS.reset}
  ${COLORS.cyan}midnight-compact-guide${COLORS.reset}   Compact language reference (v0.19+)
  ${COLORS.cyan}midnight-sdk-guide${COLORS.reset}       TypeScript SDK & wallet integration
  ${COLORS.cyan}midnight-infra-setup${COLORS.reset}     Local infrastructure setup
  ${COLORS.cyan}midnight-deploy${COLORS.reset}          Contract deployment
  ${COLORS.cyan}midnight-test-runner${COLORS.reset}     Test execution & debugging

${COLORS.bright}MORE INFO${COLORS.reset}
  ${COLORS.dim}GitHub:${COLORS.reset}  https://github.com/UvRoxx/midnight-agent-skills
  ${COLORS.dim}Docs:${COLORS.reset}    https://docs.midnight.network
`);
}

function listSkills() {
  showBanner();
  log(`${COLORS.bright}Available Skills:${COLORS.reset}\n`);

  for (const skill of SKILLS) {
    const skillPath = join(PACKAGE_ROOT, 'skills', skill, 'SKILL.md');
    if (existsSync(skillPath)) {
      const content = readFileSync(skillPath, 'utf-8');
      const descMatch = content.match(/description:\s*(.+)/);
      const desc = descMatch ? descMatch[1].split('.')[0] : 'No description';
      log(`  ${COLORS.cyan}${skill}${COLORS.reset}`);
      log(`  ${COLORS.dim}${desc}${COLORS.reset}\n`);
    }
  }
}

function copySkill(skillName, targetDir) {
  const sourcePath = join(PACKAGE_ROOT, 'skills', skillName);
  const destPath = join(targetDir, 'skills', skillName);

  if (!existsSync(sourcePath)) {
    log(`  ${COLORS.red}✗${COLORS.reset} Skill not found: ${skillName}`, COLORS.red);
    return false;
  }

  mkdirSync(destPath, { recursive: true });
  cpSync(sourcePath, destPath, { recursive: true });
  log(`  ${COLORS.green}✓${COLORS.reset} ${skillName}`);
  return true;
}

function copyAgentFiles(targetDir) {
  const files = ['AGENTS.md', 'CLAUDE.md'];

  for (const file of files) {
    const sourcePath = join(PACKAGE_ROOT, file);
    const destPath = join(targetDir, file);

    if (existsSync(sourcePath)) {
      const content = readFileSync(sourcePath, 'utf-8');
      writeFileSync(destPath, content);
      log(`  ${COLORS.green}✓${COLORS.reset} ${file}`);
    }
  }
}

function init(targetDir = '.') {
  showBanner();

  const resolvedDir = join(process.cwd(), targetDir);

  log(`${COLORS.bright}Initializing midnight-agent-skills skills...${COLORS.reset}\n`);
  log(`${COLORS.dim}Target: ${resolvedDir}${COLORS.reset}\n`);

  // Create skills directory
  const skillsDir = join(resolvedDir, 'skills');
  mkdirSync(skillsDir, { recursive: true });

  log(`${COLORS.bright}Copying skills:${COLORS.reset}`);
  let copied = 0;
  for (const skill of SKILLS) {
    if (copySkill(skill, resolvedDir)) {
      copied++;
    }
  }

  log(`\n${COLORS.bright}Copying agent files:${COLORS.reset}`);
  copyAgentFiles(resolvedDir);

  log(`
${COLORS.green}${COLORS.bright}Done!${COLORS.reset} Copied ${copied} skills to ${targetDir === '.' ? 'current directory' : targetDir}

${COLORS.bright}Next steps:${COLORS.reset}
  1. Your AI agent will automatically use these skills
  2. Try asking: "${COLORS.cyan}Write a Midnight contract for voting${COLORS.reset}"
  3. Or: "${COLORS.cyan}Set up local Midnight infrastructure${COLORS.reset}"

${COLORS.dim}Learn more: https://github.com/UvRoxx/midnight-agent-skills${COLORS.reset}
`);
}

function addSkill(skillName) {
  showBanner();

  if (!skillName) {
    log(`${COLORS.red}Error: Please specify a skill name${COLORS.reset}`);
    log(`\nUsage: npx midnight-agent-skills add <skill-name>`);
    log(`\nRun ${COLORS.cyan}npx midnight-agent-skills list${COLORS.reset} to see available skills`);
    process.exit(1);
  }

  if (!SKILLS.includes(skillName)) {
    log(`${COLORS.red}Error: Unknown skill '${skillName}'${COLORS.reset}`);
    log(`\nAvailable skills:`);
    SKILLS.forEach(s => log(`  - ${s}`));
    process.exit(1);
  }

  log(`${COLORS.bright}Adding skill: ${skillName}${COLORS.reset}\n`);

  const targetDir = process.cwd();
  mkdirSync(join(targetDir, 'skills'), { recursive: true });

  if (copySkill(skillName, targetDir)) {
    log(`\n${COLORS.green}${COLORS.bright}Done!${COLORS.reset} Skill added successfully`);
  }
}

export function run(args) {
  const command = args[0];
  const arg = args[1];

  switch (command) {
    case 'init':
      init(arg || '.');
      break;
    case 'list':
      listSkills();
      break;
    case 'add':
      addSkill(arg);
      break;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    case undefined:
      showHelp();
      break;
    default:
      log(`${COLORS.red}Unknown command: ${command}${COLORS.reset}`);
      log(`\nRun ${COLORS.cyan}npx midnight-agent-skills help${COLORS.reset} for usage`);
      process.exit(1);
  }
}
