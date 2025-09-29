import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the suffix from the command-line argument
const suffix = process.argv[2] || '';
const filePrefix = suffix ? `-${suffix}` : '';

// Paths to the input files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const namesFile = path.join(__dirname, `names${filePrefix}.txt`);
const historyFile = path.join(__dirname, `history${filePrefix}.txt`);

// Load names and families from the names.txt file
function loadNames(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`Names file not found: ${filePath}`);
        process.exit(1);
    }
    const content = fs.readFileSync(filePath, 'utf-8').trim();
    return content.split('\n').map(line => {
        const [name, family] = line.split(',').map(item => item.trim());
        return { name, family };
    });
}

// Load historical pairs from history.txt
function loadHistory(filePath) {
    if (!fs.existsSync(filePath)) return new Set();
    const content = fs.readFileSync(filePath, 'utf-8').trim();
    const history = new Set(content.split('\n').map(line => line.split(',').slice(0, 2).join(',')));
    return history;
}

// Save new pairs to the history file
function saveHistory(filePath, pairs) {
    const year = new Date().getFullYear();
    const data = pairs.map(pair => `${pair.giver.name},${pair.receiver.name},${year}`).join('\n');
    fs.appendFileSync(filePath, data + '\n');
    console.log(`Saved ${pairs.length} pairs to history with the year ${year}.`);
}

// Shuffle an array (Fisher-Yates algorithm)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Generate a valid matching that ensures everyone gives and receives a gift
function generateMatching(participants, history) {
    let receivers = [...participants];
    let matching = [];
    let maxAttempts = 1000; // Prevent infinite loops in case of bad constraints

    while (maxAttempts-- > 0) {
        shuffle(receivers);
        let isValid = true;
        matching = [];

        for (let i = 0; i < participants.length; i++) {
            const giver = participants[i];
            const receiver = receivers[i];

            // Validation: Ensure no self-pairing, family pairing, or historical pairing
            if (
                giver.name === receiver.name || // Self-pairing
                giver.family === receiver.family || // Same family
                history.has(`${giver.name},${receiver.name}`) // Historical pairing
            ) {
                isValid = false;
                break;
            }

            matching.push({ giver, receiver });
        }

        if (isValid) return matching; // Valid matching found
    }

    throw new Error('Unable to generate a valid matching after multiple attempts.');
}

// Main function
function main() {
    const participants = loadNames(namesFile);
    const history = loadHistory(historyFile);

    if (participants.length < 2) {
        console.error('At least two participants are required.');
        process.exit(1);
    }

    console.log(`Loaded participants from ${namesFile}:`, participants);
    console.log(`Loaded historical pairs from ${historyFile}:`, Array.from(history));

    try {
        const newPairs = generateMatching(participants, history);

        console.log('Generated new pairs:');
        console.log(newPairs.map(pair => `${pair.giver.name} → ${pair.receiver.name}`).join('\n'));

        // Save new pairs to history
        saveHistory(historyFile, newPairs);
    } catch (error) {
        console.error(error.message);
    }
}

main();
