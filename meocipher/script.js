/**
 * MeoCipher - Vietnamese Text to "Mèo" Encoder/Decoder
 * 
 * Algorithm:
 * 1. Extract tone mark from Vietnamese word (0-5)
 * 2. Remove tone marks from word
 * 3. Convert each character to Unicode code point
 * 4. Convert to base-6 representation
 * 5. Map each digit (0-5) to mèo variant
 * 6. Apply capitalization based on original tone
 */

// ===== Constants =====
const MEO_VARIANTS = ['meo', 'mèo', 'méo', 'mẻo', 'mẽo', 'mẹo'];

// Tone mark mappings
const TONE_MAP = {};
const TO_BASE_VOWEL = {};

// Initialize tone mappings
(function initToneMaps() {
    const tones = {
        1: 'àèìòùỳầềồừằờÀÈÌÒÙỲẦỀỒỪẰỜ',  // Huyền
        2: 'áéíóúýấếốứắớÁÉÍÓÚÝẤẾỐỨẮỚ',  // Sắc
        3: 'ảẻỉỏủỷẩểổửẳởẢẺỈỎỦỶẨỂỔỬẲỞ',  // Hỏi
        4: 'ãẽĩõũỹẫễỗữẵỡÃẼĨÕŨỸẪỄỖỮẴỠ',  // Ngã
        5: 'ạẹịọụỵậệộựặợẠẸỊỌỤỴẬỆỘỰẶỢ'   // Nặng
    };

    for (const [tone, chars] of Object.entries(tones)) {
        for (const c of chars) {
            TONE_MAP[c] = parseInt(tone);
        }
    }

    // Base vowel mappings (toned → untoned)
    const vowelMappings = [
        ['àáảãạ', 'a'], ['ằắẳẵặ', 'ă'], ['ầấẩẫậ', 'â'],
        ['èéẻẽẹ', 'e'], ['ềếểễệ', 'ê'],
        ['ìíỉĩị', 'i'],
        ['òóỏõọ', 'o'], ['ồốổỗộ', 'ô'], ['ờớởỡợ', 'ơ'],
        ['ùúủũụ', 'u'], ['ừứửữự', 'ư'],
        ['ỳýỷỹỵ', 'y']
    ];

    for (const [toned, base] of vowelMappings) {
        for (const c of toned) {
            TO_BASE_VOWEL[c] = base;
            TO_BASE_VOWEL[c.toUpperCase()] = base.toUpperCase();
        }
    }
})();

// Tone table for adding tones back
const TONE_TABLE = {
    'a': ['a', 'à', 'á', 'ả', 'ã', 'ạ'],
    'ă': ['ă', 'ằ', 'ắ', 'ẳ', 'ẵ', 'ặ'],
    'â': ['â', 'ầ', 'ấ', 'ẩ', 'ẫ', 'ậ'],
    'e': ['e', 'è', 'é', 'ẻ', 'ẽ', 'ẹ'],
    'ê': ['ê', 'ề', 'ế', 'ể', 'ễ', 'ệ'],
    'i': ['i', 'ì', 'í', 'ỉ', 'ĩ', 'ị'],
    'o': ['o', 'ò', 'ó', 'ỏ', 'õ', 'ọ'],
    'ô': ['ô', 'ồ', 'ố', 'ổ', 'ỗ', 'ộ'],
    'ơ': ['ơ', 'ờ', 'ớ', 'ở', 'ỡ', 'ợ'],
    'u': ['u', 'ù', 'ú', 'ủ', 'ũ', 'ụ'],
    'ư': ['ư', 'ừ', 'ứ', 'ử', 'ữ', 'ự'],
    'y': ['y', 'ỳ', 'ý', 'ỷ', 'ỹ', 'ỵ']
};

// ===== Encoding Functions =====

function getTone(word) {
    for (const c of word) {
        if (TONE_MAP[c] !== undefined) {
            return TONE_MAP[c];
        }
    }
    return 0; // Không dấu
}

function getTonePosition(word) {
    let index = 0;
    for (const c of word) {
        if (TONE_MAP[c] !== undefined) {
            return index;
        }
        index++;
    }
    return 0;
}

function removeTone(word) {
    let result = '';
    for (const c of word) {
        result += TO_BASE_VOWEL[c] || c;
    }
    return result;
}

const DIGITS_PER_CHAR = 4; // Fixed width: 6^4 = 1296, enough for all Vietnamese base chars

function textToBase6(text) {
    const result = [];
    for (const c of text) {
        let code = c.charCodeAt(0);
        const digits = [];
        if (code === 0) {
            for (let i = 0; i < DIGITS_PER_CHAR; i++) digits.push(0);
        } else {
            while (code > 0) {
                digits.unshift(code % 6);
                code = Math.floor(code / 6);
            }
            while (digits.length < DIGITS_PER_CHAR) {
                digits.unshift(0);
            }
        }
        result.push(...digits);
    }
    return result;
}

function applyCapitalization(meo, tone) {
    const chars = meo.split('');

    switch (tone) {
        case 0: // Ngang - viết thường
            return meo.toLowerCase();
        case 1: // Huyền - viết hoa chữ đầu
            chars[0] = chars[0].toUpperCase();
            break;
        case 2: // Sắc - viết hoa chữ thứ 2
            chars[1] = chars[1].toUpperCase();
            break;
        case 3: // Hỏi - viết hoa chữ thứ 3
            chars[2] = chars[2].toUpperCase();
            break;
        case 4: // Ngã - viết hoa 2 chữ đầu
            chars[0] = chars[0].toUpperCase();
            chars[1] = chars[1].toUpperCase();
            break;
        case 5: // Nặng - viết hoa 2 chữ cuối
            chars[1] = chars[1].toUpperCase();
            chars[2] = chars[2].toUpperCase();
            break;
    }

    return chars.join('');
}

function encodeWord(word) {
    const tone = getTone(word);
    const tonePos = getTonePosition(word);
    const noTone = removeTone(word);

    // Encode tone position as DIGITS_PER_CHAR base-6 digits, prepended
    const posDigits = [];
    let p = tonePos;
    for (let i = 0; i < DIGITS_PER_CHAR; i++) {
        posDigits.unshift(p % 6);
        p = Math.floor(p / 6);
    }

    const textBase6 = textToBase6(noTone);
    const base6 = [...posDigits, ...textBase6];

    return base6.map(digit => {
        const meo = MEO_VARIANTS[digit];
        return applyCapitalization(meo, tone);
    }).join(' ');
}

function encode(text) {
    const words = text.trim().split(/\s+/);
    return words.map(word => encodeWord(word)).join(' | ');
}

// ===== Decoding Functions =====

function detectTone(meo) {
    if (meo.length < 3) return 0;

    const first = meo[0] === meo[0].toUpperCase() && meo[0] !== meo[0].toLowerCase();
    const second = meo[1] === meo[1].toUpperCase() && meo[1] !== meo[1].toLowerCase();
    const third = meo[2] === meo[2].toUpperCase() && meo[2] !== meo[2].toLowerCase();

    if (!first && !second && !third) return 0; // Ngang
    if (first && !second && !third) return 1;  // Huyền
    if (!first && second && !third) return 2;  // Sắc
    if (!first && !second && third) return 3;  // Hỏi
    if (first && second && !third) return 4;   // Ngã
    if (!first && second && third) return 5;   // Nặng

    return 0;
}

function getMeoDigit(meo) {
    const normalized = meo.toLowerCase();
    return MEO_VARIANTS.indexOf(normalized);
}

function base6ToText(base6) {
    let result = '';
    for (let i = 0; i + DIGITS_PER_CHAR <= base6.length; i += DIGITS_PER_CHAR) {
        let code = 0;
        for (let j = 0; j < DIGITS_PER_CHAR; j++) {
                code = code * 6 + base6[i + j];
            }

        if (code > 0) {
            result += String.fromCharCode(code);
        }
    }
    return result;
}

function isVowel(c) {
    return 'aăâeêioôơuưy'.includes(c.toLowerCase());
}

function addToneToVowel(vowel, tone) {
    const lowerVowel = vowel.toLowerCase();
    const isUpper = vowel !== lowerVowel;

    const toneRow = TONE_TABLE[lowerVowel];
    if (toneRow && tone >= 0 && tone < toneRow.length) {
        const result = toneRow[tone];
        return isUpper ? result.toUpperCase() : result;
    }

    return vowel;
}

function applyToneAtPosition(text, tone, pos) {
    if (tone === 0) return text;
    const chars = [...text];
    if (pos >= 0 && pos < chars.length && isVowel(chars[pos])) {
        chars[pos] = addToneToVowel(chars[pos], tone);
    }
    return chars.join('');
}

function decodeWordGroup(group) {
    const meoWords = group.trim().split(/\s+/);
    if (meoWords.length === 0) return '';

    // Detect tone from first meo word
    const tone = detectTone(meoWords[0]);

    // Convert meo words to base-6 digits
    const base6 = [];
    for (const meo of meoWords) {
        const digit = getMeoDigit(meo);
        if (digit >= 0) base6.push(digit);
    }

    // First DIGITS_PER_CHAR digits encode the tone position
    let tonePos = 0;
    for (let i = 0; i < DIGITS_PER_CHAR && i < base6.length; i++) {
        tonePos = tonePos * 6 + base6[i];
    }

    // Remaining digits encode the text
    const textBase6 = base6.slice(DIGITS_PER_CHAR);
    const noToneText = base6ToText(textBase6);

    // Apply tone at the correct position
    return applyToneAtPosition(noToneText, tone, tonePos);
}

function decode(text) {
    const wordGroups = text.trim().split(/\s*\|\s*/);
    return wordGroups.map(group => decodeWordGroup(group)).join(' ');
}

// ===== UI Functions =====

const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const encodeBtn = document.getElementById('encodeBtn');
const decodeBtn = document.getElementById('decodeBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Update button states
inputText.addEventListener('input', () => {
    const hasText = inputText.value.trim().length > 0;
    encodeBtn.disabled = !hasText;
    decodeBtn.disabled = !hasText;
});

// Encode
encodeBtn.addEventListener('click', () => {
    const text = inputText.value.trim();
    if (!text) return;

    const result = encode(text);
    outputText.innerHTML = result;
    outputText.classList.remove('placeholder');
});

// Decode
decodeBtn.addEventListener('click', () => {
    const text = inputText.value.trim();
    if (!text) return;

    const result = decode(text);
    outputText.innerHTML = result;
    outputText.classList.remove('placeholder');
});

// Copy
copyBtn.addEventListener('click', async () => {
    const text = outputText.textContent;
    if (!text || text === 'Kết quả sẽ hiển thị ở đây...') return;

    try {
        await navigator.clipboard.writeText(text);
        showToast('Đã sao chép!');
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Đã sao chép!');
    }
});

// Clear
clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.innerHTML = '<span class="placeholder">Kết quả sẽ hiển thị ở đây...</span>';
    encodeBtn.disabled = true;
    decodeBtn.disabled = true;
});

// Toast notification
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hidden');
    }, 2000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!encodeBtn.disabled) {
                encodeBtn.click();
            }
        }
    }
});
