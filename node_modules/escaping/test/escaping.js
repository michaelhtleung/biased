import { split, escape, unescape } from '../src';

const chai   = require('chai');
const assert = chai.assert;

describe("split() tests", function() {
    it('simple split', function() {
        assert.deepEqual(split('1.2.3', '.', '\\'), ['1', '2', '3']);
        assert.deepEqual(split('one', '.', '\\'), ['one']);
        assert.deepEqual(split("banana\napple\norange", "\n", '\\'), ['banana', 'apple', 'orange']);
        assert.deepEqual(split('item-2|item.3|item:4|$item5', '|', '\\'), ['item-2', 'item.3', 'item:4', '$item5']);
    });

    it('empty split', function() {
        assert.deepEqual(split('', '.', '\\'), ['']);
        assert.deepEqual(split("1.", '.', '\\'), ['1', '']);
        assert.deepEqual(split('.%', '.', '\\'), ['', '%']);
        assert.deepEqual(split('..', '.', '\\'), ['', '', '']);
    });

    it('some split char', function() {
        assert.deepEqual(split('1%2%', '%', '\\'), ['1', '2', '']);
        assert.deepEqual(split("a\nb\n", "\n", '\\'), ['a', 'b', '']);
        assert.deepEqual(split("\t%", "\t", '\\'), ['', '%']);
        assert.deepEqual(split("\r\r", "\r", '\\'), ['', '', '']);
        assert.deepEqual(split('aBb', 'B', '\\'), ['a', 'b']);
        assert.deepEqual(split('aЯbЯ', 'Я', '\\'), ['a', 'b', '']);
    });

    it('split with escape', function() {
        assert.deepEqual(split('a.b.c\\.d', '.', '\\'), ['a', 'b', 'c.d']);
        assert.deepEqual(split('a.b.c\\.\\.', '.', '\\'), ['a', 'b', 'c..']);
        assert.deepEqual(split('\\a.b.\\c', '.', '\\'), ['\\a', 'b', '\\c']);
        assert.deepEqual(split('\\a.b.c\\', '.', '\\'), ['\\a', 'b', 'c\\']);
        assert.deepEqual(split('a.b\\\\.c', '.', '\\'), ['a', 'b\\', 'c']);
        assert.deepEqual(split('a.b\\\\\\.c', '.', '\\'), ['a', 'b\\.c']);
        assert.deepEqual(split('a.b.\\..c', '.', '\\'), ['a', 'b', '.', 'c']);
        assert.deepEqual(split('a\\.\\\\.\\.b\\\\.c', '.', '\\'), ['a.\\', '.b\\', 'c']);
        assert.deepEqual(split('a\\\\\\b', '.', '\\'), ['a\\\\b']);
    });

    it('some escape char', function() {
        assert.deepEqual(split('a.b$.c.d', '.', '$'), ['a', 'b.c', 'd']);
        assert.deepEqual(split('a.b.?c.?.', '.', '?'), ['a', 'b', '?c', '.']);
        assert.deepEqual(split("\ta.b\t.c", '.', "\t"), ["\ta", 'b.c']);
        assert.deepEqual(split("a.b\n\n.c", '.', "\n"), ['a', "b\n", 'c']);
        assert.deepEqual(split("a.b\r\r\r.c", '.', "\r"), ['a', "b\r.c"]);
        assert.deepEqual(split('a.b.A..c', '.', 'A'), ['a', 'b', '.', 'c']);
        assert.deepEqual(split('aя.яя.я.bяя.c', '.', 'я'), ['a.я', '.bя', 'c']);
        assert.deepEqual(split("a\0\0\0b", '.', "\0"), ["a\0\0b"]);
    });
});


describe("unescape() tests", function() {
    it('simple unescape', function() {
        assert.strictEqual(unescape('1\\.2\\.3', '.', '\\'), '1.2.3');
        assert.strictEqual(unescape('one', '.', '\\'), 'one');
        assert.strictEqual(unescape("banana\\\napple\\\norange", "\n", '\\'), "banana\napple\norange");
        assert.strictEqual(unescape('item-2\\|item.3\\|item:4\\|$item5', '|', '\\'), 'item-2|item.3|item:4|$item5');
    });

    it('empty unescape', function() {
        assert.strictEqual(unescape('', '.', '\\'), '');
        assert.strictEqual(unescape('1\\.', '.', '\\'), '1.');
        assert.strictEqual(unescape('\\\\%', '.', '\\'), '\\%');
        assert.strictEqual(unescape('.\\.', '.', '\\'), '..');
    });

    it('unescape with some split char', function() {
        assert.strictEqual(unescape('1\\%2\\%', '%', '\\'), '1%2%');
        assert.strictEqual(unescape("a\\\nb\n", "\n", '\\'), "a\nb\n");
        assert.strictEqual(unescape("\\\t%", "\t", '\\'), "\t%");
        assert.strictEqual(unescape("\r\\\r\r", "\r", '\\'), "\r\r\r");
        assert.strictEqual(unescape('a\\Bb', 'B', '\\'), 'aBb');
        assert.strictEqual(unescape('a\\Яb\\Я', 'Я', '\\'), 'aЯbЯ');
    });

    it('unescape with escape chars', function() {
        assert.strictEqual(unescape('a.b.c\\.d', '.', '\\'), 'a.b.c.d');
        assert.strictEqual(unescape('a.b.c\\.\\.', '.', '\\'), 'a.b.c..');
        assert.strictEqual(unescape('\\a.b.\\c', '.', '\\'), '\\a.b.\\c');
        assert.strictEqual(unescape('\\a.b.c\\', '.', '\\'), '\\a.b.c\\');
        assert.strictEqual(unescape('a.b\\\\.c', '.', '\\'), 'a.b\\.c');
        assert.strictEqual(unescape('a.b\\\\\\.c', '.', '\\'), 'a.b\\.c');
        assert.strictEqual(unescape('a.b.\\..c', '.', '\\'), 'a.b...c');
        assert.strictEqual(unescape('a\\.\\\\.\\.b\\\\.c', '.', '\\'), 'a.\\..b\\.c');
        assert.strictEqual(unescape('a\\\\\\b', '.', '\\'), 'a\\\\b');
    });

    it('unescape with some escape char', function() {
        assert.strictEqual(unescape('a.b$.c.d', '.', '$'), 'a.b.c.d');
        assert.strictEqual(unescape('a.b.?c.?.', '.', '?'), 'a.b.?c..');
        assert.strictEqual(unescape("\ta.b\t.c", '.', "\t"), "\ta.b.c");
        assert.strictEqual(unescape("a.b\n\n.c", '.', "\n"), "a.b\n.c");
        assert.strictEqual(unescape("a.b\r\r\r.c", '.', "\r"), "a.b\r.c");
        assert.strictEqual(unescape('a.b.A..c', '.', 'A'), 'a.b...c');
        assert.strictEqual(unescape('aя.яя.я.bяя.c', '.', 'я'), 'a.я..bя.c');
        assert.strictEqual(unescape("a\0\0\0b", '.', "\0"), "a\0\0b");
    });
});


describe("escape() tests", function() {
    it('simple escape', function() {
        assert.strictEqual(escape('1.2.3', '.', '\\'), '1\\.2\\.3');
        assert.strictEqual(escape('one', '.', '\\'), 'one');
        assert.strictEqual(escape("banana\napple\norange", "\n", '\\'), "banana\\\napple\\\norange");
        assert.strictEqual(escape('item-2|item.3|item:4|$item5', '|', '\\'), "item-2\\|item.3\\|item:4\\|$item5");
        assert.strictEqual(escape('...', '.', '\\'), "\\.\\.\\.");
    });

    it('escape with some split chars', function() {
        assert.strictEqual(escape('a$b$$c$d', '$', '\\'), "a\\$b\\$\\$c\\$d");
        assert.strictEqual(escape("\ta.b\t.c", "\t", '\\'), "\\\ta.b\\\t.c");
        assert.strictEqual(escape("a.b\n\n.c", "\n", '\\'), "a.b\\\n\\\n.c");
        assert.strictEqual(escape("a.b\r\r\r.c", "\r", '\\'), "a.b\\\r\\\r\\\r.c");
        assert.strictEqual(escape('a.b.A..c', 'A', '\\'), 'a.b.\\A..c');
        assert.strictEqual(escape('aя.яя.я.bяя.c', 'я', '\\'), 'a\\я.\\я\\я.\\я.b\\я\\я.c');
        assert.strictEqual(escape('a\0\0\0b', '\0', '\\'), 'a\\\0\\\0\\\0b');
    });

    it('escape with some escape chars', function() {
        assert.strictEqual(escape('a.b.c\\.d', '.', '\\'), 'a\\.b\\.c\\\\\\.d');
        assert.strictEqual(escape('a.b.c?.?.', '.', '?'), 'a?.b?.c???.???.');
        assert.strictEqual(escape("\na.b.\nc", '.', "\n"), "\n\na\n.b\n.\n\nc");
        assert.strictEqual(escape("a.b\0\0.c", '.', "\0"), "a\0.b\0\0\0\0\0.c");
        assert.strictEqual(escape('a.bяяя.c', '.', 'я'), 'aя.bяяяяяяя.c');
    });
});