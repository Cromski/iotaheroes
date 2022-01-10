<script>
  export let name;
  export let diceRoll;
  export let adventureType;

  const getAdventureType = (typeId) => {
    console.log(typeId);
    switch (typeId) {
      case "0":
        return "MONSTER";
      case "1":
        return "Nothing happened";
      case "2":
        return "Mental Training";
      case "3":
        return "Physical Training";
      case "4":
        return "Friendly Encounter";
      case "5":
        return "Environment";
    }
  };
</script>

<p>
  <strong>
    You completed the "{name}" adventure, you rolled a "{diceRoll}". The
    adventure type was: {getAdventureType(adventureType)}</strong
  >
</p>
