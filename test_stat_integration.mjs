import { stat } from './src/tlacuache-modulo.mjs';

console.log("--- Testing Stat Library Integration ---");

// 1. Binomial PDF
// n=10, p=0.5, k=5 => 0.2461
const bin_pdf = stat.binomialpdf(10, 0.5, 5);
console.log(`Binomial PDF (10, 0.5, 5): ${bin_pdf.toFixed(4)} (Expected: ~0.2461)`);

// 2. Binomial CDF
// n=10, p=0.5, k=5 => 0.6230
const bin_cdf = stat.binomialcdf(10, 0.5, 5);
console.log(`Binomial CDF (10, 0.5, 5): ${bin_cdf.toFixed(4)} (Expected: ~0.6230)`);

// 3. Normal CDF
// mu=0, sigma=1, lower=-1.96, upper=1.96 => 0.95
const norm_cdf = stat.normalcdf(-1.96, 1.96, 0, 1);
console.log(`Normal CDF (-1.96, 1.96, 0, 1): ${norm_cdf.toFixed(4)} (Expected: ~0.9500)`);

// 4. Inverse Normal
// area=0.975, mu=0, sigma=1 => 1.96
const inv_norm = stat.invNorm(0.975, 0, 1);
console.log(`InvNorm (0.975, 0, 1): ${inv_norm.toFixed(4)} (Expected: ~1.9600)`);

// 5. Linear Regression
// x = [1, 2, 3], y = [2, 4, 6] => y = 2x + 0
const x = [1, 2, 3];
const y = [2, 4, 6];
const lin_reg = stat.LinReg(x, y);
console.log(`LinReg: ${lin_reg.eqn} (Expected: y = 2.0000x + 0.0000)`);

// 6. Spearman
// x = [1, 2, 3], y = [1, 2, 3] => 1
const spearman = stat.Spearman(x, y);
console.log(`Spearman: ${spearman.toFixed(4)} (Expected: 1.0000)`);

console.log("--- Test Complete ---");
