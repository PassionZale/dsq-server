import referralCodeGenerator from 'referral-code-generator';

export function generateReferralCode(): string {
  return referralCodeGenerator.alphaNumeric('uppercase', 4, 1);
}
