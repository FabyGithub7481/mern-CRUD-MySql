import { pool } from "../db.js";

export const getTasks = async (req, res) => {
  const [result] = await pool.query(
    "SELECT * FROM tasks ORDER BY createAt ASC"
  );
    res.json(result);
};
export const getTask = async (req, res) => {
  try {
    //throw new Error('un error provocado')
    const id = req.params.id;
    const [result] = await pool.query("SELECT * FROM tasks WHERE id =?", [id]);
    if (!result[0]) {
      return res.status(404).json({ message: "Task not found" });
    } else {
      return res.send(result[0]);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal server error / ${error}` });
  }
};
export const createTask = async (req, res) => {
  //console.log(req.body);ç
  const { title, description } = req.body;
  const [result] = await pool.query(
    "INSERT INTO tasks(title, description) VALUES(?,?)",
    [title, description]
  );
  //console.log(result);
  res.json({
    id: result.insertId,
    title,
    description,
  });
};
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query("UPDATE tasks SET ?  WHERE id =?", [
      req.body,
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal server error / ${error}` });
  }
};

export const deleteTask = async (req, res) => {
  try {
    //tratando de reutilzar la funcion getTask
    /*const resultGet = await getTask(req, res);    
    if (resultGet.statusCode === 200) {
      const [result] = await pool.query("DELETE FROM tasks WHERE id =?", [id]);
      console.log(result);
      return res.sendStatus(204);
    }*/

    const id = req.params.id;
    const [result] = await pool.query("DELETE FROM tasks WHERE id =?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal server error / ${error}` });
  }
};
