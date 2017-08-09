/**
 * vkBeautify v1.0.0
 * Stripped down and modernized version of the original vkBeautify library.
 */
(function() {

    function createShiftArr(step) {
        let space = '    ';
        if (isNaN(parseInt(step))) { // argument is string
            space = step;
        } else { // argument is integer
            space = ' '.repeat(step);
        }

        const shift = ['\n'];
        for (let i = 0; i < 100; i++) {
            shift.push(shift[i] + space);
        }

        return shift;
    }

    function vkbeautify() {
        this.step = '\t';
        this.shift = createShiftArr(this.step);
    }

    vkbeautify.prototype.xml = function(text, step) {
        const ar = text.replace(/>\s{0,}</g, "><")
            .replace(/</g, "~::~<")
            .replace(/\s*xmlns\:/g, "~::~xmlns:")
            .replace(/\s*xmlns\=/g, "~::~xmlns=")
            .split('~::~');
        const len = ar.length;
        const shift = step ? createShiftArr(step) : this.shift;

        let inComment = false,
            deep = 0,
            str = '';

        for (let i = 0; i < len; i++) {
            // start comment or <![CDATA[...]]> or <!DOCTYPE
            if (ar[i].search(/<!/) > -1) {
                str += shift[deep] + ar[i];
                inComment = true;
                // end comment  or <![CDATA[...]]>
                if (ar[i].search(/-->/) > -1 || ar[i].search(/\]>/) > -1 || ar[i].search(/!DOCTYPE/) > -1) {
                    inComment = false;
                }
            }
            // end comment  or <![CDATA[...]]>
            else if (ar[i].search(/-->/) > -1 || ar[i].search(/\]>/) > -1) {
                str += ar[i];
                inComment = false;
            }
            // <elm></elm>
            else if (/^<\w/.exec(ar[i - 1]) && /^<\/\w/.exec(ar[i]) &&
                /^<[\w:\-\.\,]+/.exec(ar[i - 1]) == /^<\/[\w:\-\.\,]+/.exec(ar[i])[0].replace('/', '')) {
                str += ar[i];
                if (!inComment) deep--;
            }
            // <elm>
            else if (ar[i].search(/<\w/) > -1 && ar[i].search(/<\//) == -1 && ar[i].search(/\/>/) == -1) {
                str = !inComment ? str += shift[deep++] + ar[i] : str += ar[i];
            }
            // <elm>...</elm>
            else if (ar[i].search(/<\w/) > -1 && ar[i].search(/<\//) > -1) {
                str = !inComment ? str += shift[deep] + ar[i] : str += ar[i];
            }
            // </elm>
            else if (ar[i].search(/<\//) > -1) {
                str = !inComment ? str += shift[--deep] + ar[i] : str += ar[i];
            }
            // <elm/>
            else if (ar[i].search(/\/>/) > -1) {
                str = !inComment ? str += shift[deep] + ar[i] : str += ar[i];
            }
            // <? xml ... ?>
            else if (ar[i].search(/<\?/) > -1) {
                str += shift[deep] + ar[i];
            }
            // xmlns
            else if (ar[i].search(/xmlns\:/) > -1 || ar[i].search(/xmlns\=/) > -1) {
                str += shift[deep] + ar[i];
            }
            else {
                str += ar[i];
            }
        }

        return str[0] == '\n' ? str.slice(1) : str;
    };

    vkbeautify.prototype.json = function(text, step) {
        step = step || this.step;

        if (typeof text === 'string') {
            return JSON.stringify(JSON.parse(text), null, step);
        } else if (typeof text === 'object') {
            return JSON.stringify(text, null, step);
        } else {
            return text;
        }
    };

    self.vkbeautify = new vkbeautify();

})();
