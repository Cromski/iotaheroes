<div class=" fixed top-0 border-0 bg-[lightgoldenrodyellow] w-full h-16 z-10 flex"> <!-- navbar start -->
    <div on:click={() => (location.href = "/")} class=" flex justify-start w-1/2"> <!-- left side -->
        <button class=" px-9 text-2xl text-[#ff3e00] font-thin border-none ml-11" >IOTAHEROES</button>
    </div>
    <div class=" flex justify-end w-1/2"> <!-- right side -->
        <button on:click={() => (location.href = "/trade")} class="mr-3 h-16 w-24 border-none text-lg hover:underline">TRADE</button>
        <button on:click={() => (location.href = "/shop/0")} class=" mr-[12%] h-16 w-24 border-none text-lg hover:underline">SHOP</button>
    </div>
</div>
<div class=" mb-16"></div>