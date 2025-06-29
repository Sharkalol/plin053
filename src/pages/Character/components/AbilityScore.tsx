type AbilityScoreProps = {
    ability_name: string;
    ability_score?: number;
}

const AbilityScore = ({ability_name, ability_score}: AbilityScoreProps) => {

    const modif = (stat?: number) => {
        if (stat === undefined) return 0;
        return Math.floor((stat - 10) / 2);
    }

    return (
        <div className="border w-1/3 md:w-28 px-2 py-2 rounded-lg border-white bg-sky-400/10">
            <p>{ability_name}:</p>
            <p>{ability_score}</p>
            <p>Modifier:</p>
            <p className="text-4xl">{modif(ability_score)}</p>
        </div>
    )
};
export default AbilityScore
