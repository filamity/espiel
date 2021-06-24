import { useEffect, useState } from 'react'
import './App.css'
import List from "./List"
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

function App() {
	const [childData, setChildData] = useState({})
	const [data, setData] = useState({
        // shampoo: false,
        // toothbrush: false,
		// towels: false,
        // deodorant: false,
    })
	const [input, setInput] = useState("")
	const [customs, setCustoms] = useState([])

	// Provides a unique ID
	const [listID, setListID] = useState(0)

	/* The stuff in return() is to be replaced by functional components */
	/* This may really bother you, but I don't use semicolons
	   at the end of lines. I don't mind the code being a mix 
	   of having them and not having them though. */

	useEffect(() => {
		if (childData[0] !== undefined) {
			setData((prev) => ({
				...prev,
				// name: boolean
				[childData[0]]: childData[1]
			}))
		}
	}, [childData])

	const handleSubmit = () => {

		// Adds item into data object
		setData((prev) => ({
			...prev,
			[input]: false
		}))

		// Increments listID for next list item
		setListID(listID + 1)

		// Adds JSX element to customs
		setCustoms([...customs, 
					<li id={listID} className="item" key={input}>
						<List dataName={input} passData={setChildData} />
						{input}
						<IconButton
							aria-label="delete" 
							style={{marginLeft: "30px"}}
							onClick={() => {
								// removes item from data object
								setData((prev) => ({
									...prev,
									[input]: undefined
								}))
								// removes item from DOM
								document.getElementById(listID).remove()
							}}
						>
							<DeleteIcon />
						</IconButton>
					</li>
					])

		// Resets textfield
		setInput("")
	}

	return (
		<>
			<h1>Welcome to Espiel</h1>
			<h3>Essentials</h3>
			<ul>
				<li style={{fontSize: "18px"}}>Toiletries
					<ul>
						<li className="item"><List dataName="shampoo" passData={setChildData} />Shampoo, bodywash, conditioner</li>
						<li className="item"><List dataName="toothbrush" passData={setChildData} />Toothbrush and toothpaste</li>
						<li className="item"><List dataName="towels" passData={setChildData} />Towels</li>
						<li className="item"><List dataName="deodorant" passData={setChildData} />Deodorant</li>
					</ul>
				</li>
				<li style={{fontSize: "18px"}}>Lesson Materials
					<ul>
						<li className="item"><List dataName="textbooks" passData={setChildData} />Textbooks</li>
						<li className="item"><List dataName="stationary" passData={setChildData} />Stationary</li>
					</ul>
				</li>
				<li style={{fontSize: "18px"}}>
					<TextField 
						label="Custom Item" 
						variant="standard"
						value={input}
						onChange={e => setInput(e.target.value)}
						style={{verticalAlign: "text-bottom"}}
					/>
					<IconButton
						color="primary"
						type="submit"
						disabled={(input !== "") ? false : true}
						aria-label="delete"
						onClick={handleSubmit}
					>
						<AddIcon />
					</IconButton>
					<ul id="custom">
						{customs}
					</ul>
				</li>
			</ul>

			<h3>data = {JSON.stringify(data, null, 2)}</h3>
		</>
	)
}

export default App