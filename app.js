

// react components require capital letters
function Header(props) {
    return (
        <header>
            <h1>{ props.title}</h1>
            <span className="stats">Players: { props.totalPlayers}</span>
        </header>
    );
}

// when using a component within a component = called composition
const Player = (props) => {
    return (
      <div className="player">
        <span className="player-name">
          <button className="remove-player" onClick={() => props.removePlayer(props.id)}>✖</button>
          { props.name }
        </span>
  
        <Counter />
      </div>
    );
  }

class Counter extends React.Component {
    state = {
        score:0
    };
// need to bind custom methods within react components
// arrow functions are automatically bound to class, so use that
    incrementScore = () => {
        this.setState( prevState => {
            return {
                score: prevState.score + 1
            }
        });
    }

    decrementScore = () => {
        this.setState( prevState => {
            return {
                score: prevState.score - 1
            }
        });
    }

    render() {
        return (
            <div className="counter">
                <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
                <span className="counter-score">{this.state.score}</span>
                <button className="counter-action increment" onClick={this.incrementScore}> + </button>
            </div>
        );
    }

}

class App extends React.Component {

    state = {
        players: [
            {
                name: "Cathy",
                id: 1
              },
              {
                name: "Treasure",
                id: 2
              },
              {
                name: "Ashley",
                id: 3
              },
              {
                name: "James",
                id: 4
              }
        ]
    }

    handleRemovePlayer = (id) => {
        this.setState( prevState => {
            return {
              players: prevState.players.filter( p => p.id !== id )
            };
          });
    }

    render() {
        return (
            <div className="scoreboard">
                {/* called props, provides info to the tag */}
                <Header 
                    title="Scoreboard" 
                    totalPlayers={this.state.players.length}
                />
    
                {/* Players list */}
                {this.state.players.map(
                    player =>
                    <Player 
                        name={player.name}
                        id={player.id}
                        key={player.id.toString()}
                        removePlayer = {this.handleRemovePlayer}
                    />
                )}
            </div>
        )
    }
}
ReactDOM.render(
    // must be exactly the same as the function, should use a space
    <App />,
    document.getElementById('root')
);