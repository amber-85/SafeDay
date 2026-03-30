import cron from "node-cron";
import {pool} from "./db";

const hoursSince=(date:Date | null): number =>{
    if (!date) return Infinity;
    
    const now =new Date().getTime();
    const past =new Date(date).getTime();

    return (now-past)/(1000*60*60);
};

const checkMissedCheckIns=async()=>{
    console.log("Running dynamic check-in monitor...");

    const result=await pool.query(`SELECT*FROM users`);

    for (const user of result.rows){
        const hours=hoursSince(user.last_check_in);

        //24h
        if(hours>= 24 && !user.reminder1_sent){
            console.log (`Reminder 1 sent to ${user.name}`);

            await pool.query(
                `UPDATE users SET reminder1_sent =TRUE WHERE id=$1`,
                [user.id]
            );
        }

        //30h
        if(hours>=30 && !user.reminder2_sent){
            console.log (`Reminder 2 sent to ${user.name}`);

            await pool.query(
                `UPDATE users SET reminder2_sent=TRUE WHERE id=$1`,
                [user.id]
            );
        }

        //36h
        if(hours>=36 && !user.alert_sent){
            const contacts=await pool.query(
                `SELECT*FROM user_contacts WHERE elder_id=$1`,
                [user.id]
            );

            contacts.rows.forEach((c)=>{
                console.log(`ALERT:${user.name} haven't check-in, should notify ${c.name} `);
            });

            await pool.query(
                `UPDATE users SET alert_sent=TRUE WHERE id=$1`,
                [user.id]
            );
        }
    }
};

//run every minute
cron.schedule("* * * * *", ()=>{
    checkMissedCheckIns();
});