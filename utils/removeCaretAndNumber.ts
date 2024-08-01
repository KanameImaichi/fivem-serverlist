export default function removeCaretAndNumber (str:string) {
    // 正規表現で^とその後の数字を削除
    return str.replace(/\^\d+/g, '');
};