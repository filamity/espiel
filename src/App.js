import { useEffect, useState } from 'react'
import './App.css'
import List from "./List"
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Container from '@material-ui/core/Container';

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

	const handleSubmit = (event) => {

		event.preventDefault()

		// Adds item into data object
		setData((prev) => ({
			...prev,
			[input]: false
		}))

		// Increments listID for next list item
		setListID(listID + 1)

		// Adds JSX element to customs
		// (terrible coding in action)
		setCustoms([...customs,
					<div id={listID}>

						<ListItem button>
							<ListItemAvatar>
								<Avatar
								/>
							</ListItemAvatar>
							<ListItemText primary={`${input}`} />
							<ListItemSecondaryAction id="adddelete">
								<IconButton
									edge="end"
									aria-label="delete"
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
								<Checkbox
									style={{marginLeft: "15px"}}
									edge="end"
									disabled={(input !== "") ? false : true}
									value={input}
									onChange={(e) => setChildData([e.target.name, e.target.checked])}
									name={input}
									color="primary"
								/>
							</ListItemSecondaryAction>
						</ListItem>

					</div>
				])

		// Resets textfield
		setInput("")

	}


	return (
		<>
			<Container maxWidth="sm">

				<h1>Welcome to Espiel</h1>
				<h2>Essentials</h2>
				<h3 style={{fontSize: "18px"}}>Toiletries
					<List dataName="shampoo" passData={setChildData} />
					<List dataName="toothbrush" passData={setChildData} />
					<List dataName="towels" passData={setChildData} />
					<List dataName="deodorant" passData={setChildData} />
				</h3>
				<h3 style={{fontSize: "18px"}}>Lesson Materials
					<List dataName="textbooks" passData={setChildData} />
					<List dataName="stationary" passData={setChildData} />
				</h3>
				<h3 style={{fontSize: "18px"}}>
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
					{customs}
				</h3>

				<h3>data = {JSON.stringify(data, null, 2)}</h3>

			</Container>
		</>
	)
}

export default App