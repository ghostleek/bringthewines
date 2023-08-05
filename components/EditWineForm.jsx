export default function EditWineForm(){
    return (
    <form className = "flex flex-col gap-3">
        <div className="flex items-center">Edit a Wine</div>
        <input 
        className= "border border-slate-500 px-2 rounded"
        type = "text"
        placeholder = "Name of wine"
        />
       <select 
        className= "border border-slate-500 px-2 rounded"
        >
          <option value="" disabled selected>Select type of wine</option>
          <option value="Red">Red</option>
          <option value="White">White</option>
          <option value="Rosé">Rosé</option>
          <option value="Sparkling">Sparkling</option>
          <option value="Dessert">Dessert</option>
        </select>
        <input 
        className= "border border-slate-500 px-2 rounded"
        type = "text"
        placeholder = "Price"
        />
        <input 
        className= "border border-slate-500 px-2 rounded"
        type = "text"
        placeholder = "Description of wine"
        />
               <select 
        className= "border border-slate-500 px-2 rounded"
        >
          <option value="" disabled>Select status</option>
          <option value="Available" selected>Available</option>
          <option value="Sold">Sold</option>
          <option value="Reserved">Reserved</option>
        </select>
        <button className="bg-black font-light p-3 px-6 text-white rounded-md">Update Wine</button>
    </form>

);
}