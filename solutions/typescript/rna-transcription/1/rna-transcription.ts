type DnaNucleotide = "G" | "C" | "A" | "T";
type RnaNucleotide = "G" | "C" | "A" | "U";

const transcription: Record<DnaNucleotide, RnaNucleotide> = {
  G: "C",
  C: "G",
  A: "U",
  T: "A",
};

function isDnaNucleotide(value: string): value is DnaNucleotide {
  return value in transcription;
}

export function toRna(dna: string): string {
  return dna
    .split("")
    .map((nucleotide) => {
      if (!isDnaNucleotide(nucleotide)) {
        throw new Error("Invalid input DNA.");
      }

      return transcription[nucleotide];
    })
    .join("");
}
