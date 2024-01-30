import { ObjectId } from "typeorm";
import { Arquivo } from "./arquivo";
import ConnectionFactory from "./connection";

export class Controller {
    static async get(req, res) {
        const { id } = req.body;
        const options = id ? { _id: new ObjectId(id) } : undefined;
        const connection = await ConnectionFactory.connect();
        try {
            const arquivoRepository = await connection.getMongoRepository(Arquivo);
            const arquivos = await arquivoRepository.find(options);

            return arquivos;
        } catch(err) {
            res.json({ err: err.message })
        } finally {
            await connection.destroy()
        }
    }

    static async post(req, res) {
        const arquivo = req.body as Partial<Arquivo>;
        const connection = await ConnectionFactory.connect();
        try {
          const arquivoRepository = await connection.getMongoRepository(Arquivo);
          const arquivoCreated = await arquivoRepository.create(arquivo);
          await arquivoRepository.save(arquivoCreated);
    
          res.json(arquivoCreated);
        }
        catch (err) {
          res.json(err.message);
        }
        finally {
          await connection.destroy();
        }
    }
}