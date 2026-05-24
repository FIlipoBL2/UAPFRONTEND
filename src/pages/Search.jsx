import { createEffect, createSignal, For, Match, Switch } from "solid-js"
import { games } from "../data/mockData"
import SearchGrid from "../components/SearchGrid";
import { searchQuery } from "./userStore";

function Search(){
    const [currentPage, setCurrentPage] = createSignal(1);
    const itemsPerPage = 6;

    /** menggunakan createEffect agar saat input search bar diatas diketikan maka halaman akan kemabali ke 1 */
    createEffect(()=>{
        searchQuery();
        setCurrentPage(1);
    })

    const paginateGrid = () => {
        const start = (currentPage() - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredItems().slice(start, end)
    };

    const totalPages = () => Math.ceil(filteredItems().length / itemsPerPage);

    const nextPage = () => {
        if(currentPage() < totalPages()) setCurrentPage(currentPage() + 1);
    };

    const previousPage = () => {
        if(currentPage() > 1) setCurrentPage(currentPage() - 1);
    };

    const firstPage = () => {
        setCurrentPage(1);
    }

    const lastPage = () => {
        setCurrentPage(totalPages());
    }

    const pageNumbers = () => {
        return Array.from({length: totalPages()}, (_, i) => i + 1);
    }

    const buttonStyle = (isDisabled) => ({
        padding: "10px 15px",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.5 : 1,
        "background-color": "#2d3648",
        color: "white",
        border: "none",
        "border-radius": "8px",
        "font-weight": "bold",
        transition: "all 0.2s"
    });

    //Menambahkan function untuk search menggunakan query
    /**
     * 
     * @returns data.json yang sesuai dengan query 
     */
    function filteredItems(){
        const query = searchQuery().toLowerCase().trim();
        if(query.length == 0){
            return games
        }  
        return games.filter(game => game.title.toLowerCase().includes(query))
    }

    return(
        <div style={{ "font-family": "Arial, sans-serif", "background-color": "#f0f0f0", "min-height": "100vh" }}>
            <style>{`body { margin: 0; padding: 0; }`}</style>
            <Switch>
                <Match when={filteredItems().length === 0}>
                    <div style={{ display: "flex", "justify-content": "center", "align-items": "center", "padding-top": "100px" }}>
                        <h1 style={{ "text-align": "center" }}>No Games Found</h1>
                    </div>
                </Match>
                <Match when={filteredItems().length !== 0}>
                    <SearchGrid games={paginateGrid()} />
                        <div style={{
                            display: "flex",
                            "justify-content": "center",
                            "align-items": "center",
                            gap: "20px"
                        }}>

                        <button 
                            onClick={firstPage}
                            disabled={currentPage() === 1}
                            style={buttonStyle(currentPage() === 1)}
                        ><span>&laquo;</span></button>

                        <button 
                            onClick={previousPage}
                            disabled={currentPage() === 1}
                            style={buttonStyle(currentPage() === 1)}
                        ><span>&lsaquo;</span></button>

                            <div style={{ display: "flex", gap: "10px" }}>
                            <For each={pageNumbers()}>
                                    {(num) => (
                                        <button
                                        onClick={() => setCurrentPage(num)}
                                            style={{
                                                padding: "10px 15px",
                                                cursor: "pointer",
                                                "background-color": currentPage() === num ? "#2d3648" : "#ffffff",
                                                color: currentPage() === num ? "white" : "#2d3648",
                                                border: "1px solid #2d3648",
                                                "border-radius": "8px",
                                                "font-weight": "bold"
                                            }}
                                        >
                                            {num}
                                        </button>
                                    )}
                                </For>
                            </div>            

                        <span style={{ "font-weight": "bold" }}>
                            Page {currentPage()} of {totalPages()}
                        </span>

                        <button 
                            onClick={nextPage}
                            disabled={currentPage() === totalPages()}
                            style={buttonStyle(currentPage() === totalPages())}
                        ><span>&rsaquo;</span></button>

                        <button 
                            onClick={lastPage}
                            disabled={currentPage() === totalPages()}
                            style={buttonStyle(currentPage() === totalPages())}
                        ><span>&raquo;</span></button>
                    </div>
                </Match>
            </Switch>
           
        </div>            
    );
}

export default Search