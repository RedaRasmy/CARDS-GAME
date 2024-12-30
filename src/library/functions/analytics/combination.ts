function factorial(n: number): number {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

export default function C(n: number, k: number): number {
    if (k > n) return 0;
    return factorial(n) / (factorial(k) * factorial(n - k));
}

