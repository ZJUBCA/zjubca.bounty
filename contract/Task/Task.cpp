#include "Task.hpp"

const int FIRST_TASK_ID = 1;

namespace zjubcabounty{
    
    void Task::printask(uint64_t task_id, bool description=false){
        // "main":{ 
        //     "id": 1,  
        //     "title": "Random-Draw-DApp",  
        //     "status": "In Executing",  "rolenumbers": 30,  "reward": "10000 ZJUBCA",  "pledge": "1000 ZJUBCA",  "updatedat": "2019-03-02 21:00",  "requires": "requires:None",  "likevote": 11,  "hatevote": 1,  
        //     "author": {   "id": 1,   "username": "jackma" },  
        //     "participants": {  "id": 1,   "username": "jackma" } 

        Task::taskIndex tasks(_self, _self);
        auto iterator = tasks.find(task_id);
        eosio_assert(iterator != tasks.end(), "The task was NOT FOUND ... ");

        auto thetask = tasks.get(task_id);
        print(" { \"id\": ", thetask.id, ", ");//\"main\":
        print(" \"title\": \"", thetask.title.c_str(),"\", ");
        // print(" ||- description: ", thetask.description.c_str());
        print(" \"status\": \"", thetask.status.c_str(),"\", ");
        print(" \"rolenumbers\": ", thetask.rolenumbers.c_str(), ", ");//c_str()
        print(" \"reward\": \"", thetask.reward.c_str(),"\", ");
        print(" \"pledge\": \"", thetask.pledge.c_str(),"\", ");
        print(" \"updatedat\": \"", thetask.updatedat.c_str(),"\", ");
        print(" \"requires\": \"", thetask.requires.c_str(),"\", ");
        print(" \"likevote\": \"", thetask.likevote.c_str(), "\", ");//c_str()
        print(" \"hatevote\": \"", thetask.hatevote.c_str(), "\", ");//.c_str()
        print(" \"author\": { ");
        // print("  \"id\": ",thetask.participants.at(0).id,", ");
        print("  \"username\": \"",thetask.participants.at(0).username.c_str(),"\"");
         print(" }", ", ");
        print(" \"participants\": {");
        if (thetask.participants.size() > 0) {
            for (uint32_t i = 0; i < thetask.participants.size(); i++) {//i = 1 => i = 0
                // ATN： thetask.participants.at(0).id = 1 ！！！！
                // print("  \"id\": ",thetask.participants.at(i).id, ", ");
                print("  \"username\": \"",thetask.participants.at(i).username.c_str(),"\" ");
                print("} ");
            }
        } else {
            print("{\"id\":Undefined,  \"username\":Undefined }  ");//(PARTICIPANTS UNDEFINED YET.)
        }
        if(description)
            print(",\"description\": \"", thetask.description.c_str(),"\"");
        print("}");// \n
    }

    //uint64_t authorid,
    [[eosio::action]]
    void Task::create(const account_name author, uint64_t id, string& authorname,  string& title, 
    string& description, string& status, string& rolenumbers, string& reward, string& pledge, string& updatedat, 
    string& requires, string& likevote, string& hatevote){
        Task::taskIndex tasks(_self, _self);
        auto iterator = tasks.find(id);
        eosio_assert(iterator == tasks.end(), "This ID of Task already existed !!!");

        tasks.emplace(author, [&](auto& tasks) {
            tasks.id = id;   tasks.title = title;   tasks.description = description;  tasks.status = status;  
            tasks.rolenumbers = rolenumbers;   tasks.reward = reward;   tasks.pledge = pledge; 
            tasks.updatedat = updatedat;   tasks.requires = requires;   tasks.likevote = likevote; 
            tasks.hatevote = hatevote; 
        });
        iterator = tasks.find(id);
        tasks.modify(iterator, author, [&](auto& tasks) {
            tasks.participants.push_back(user{
                //authorid,
                authorname
            });
        });
        print("{ \"message\":\"Successfully create a task named <strong>",title,"</strong> in ZJUBCA.Bounty!\" }");
    }
    

    [[eosio::action]]
    void Task::selectatask(const account_name author, uint64_t task_id){
        // print("{");
        printask(task_id,true);
        // Task::taskIndex tasks(_self, _self);

        // auto thetask = tasks.get(task_id);
        // print(",\"description\": \"", thetask.description.c_str(),"\"");
        // print("}");
    }
    
    [[eosio::action]]
    void Task::selectitems(const account_name author, string& filter, string& judge, string& value){
        // print("0");
        Task::taskIndex tasks(_self, _self);
        int task_id = 1;
        for(task_id = 1; ; task_id++){
            auto iterator = tasks.find(task_id);
            if(iterator == tasks.end()){
                break;
            }
        }
        int length = task_id - 1;
        // print("length = ",length);
        // print("1");
        if(filter=="*"){
            print("{\"tasks\":[");
            for(int task_id = FIRST_TASK_ID; task_id <= length ;task_id++){ // task_id <= tasks.size()
                printask(task_id);
                if(task_id!=length){
                    print(",");
                }
            }
            print("]}");
        }else{
            // print("2");
            if(filter=="tasktitle"){
                // print("3");
                if(judge=="equal"){
                    print("{");
                    for(int task_id = FIRST_TASK_ID; task_id <= length ;task_id++){//task_id <= tasks.size()
                        // print("before break");
                        auto thetask = tasks.get(task_id);
                        if(thetask.title.c_str()==value){
                            print("{");
                            printask(task_id);
                            print("}, ");
                        }
                    }
                    print("}");
                }else{
                    print("filter == tasktitle, but judge failed.");
                }
            }else if(filter=="taskstatus"){
                if(judge=="equal"){
                    print("{");
                    for(int task_id = FIRST_TASK_ID ; task_id <= length ; task_id++){//task_id <= tasks.size()
                        auto thetask = tasks.get(task_id);
                        if(thetask.status.c_str()==value){
                            print("{");
                            printask(task_id);
                            print("{");
                        }
                    }
                    print("}");
                }else{
                    print("filter == taskstatus, but judge failed.");
                }
            }else if(filter=="taskauthor"){
                 if(judge=="equal"){
                    print("{");
                    for(int task_id = FIRST_TASK_ID ; task_id <= length ; task_id++){//task_id <= tasks.size()
                        auto thetask = tasks.get(task_id);
                        if(thetask.participants.at(0).username.c_str()==value){
                            print("{");
                            printask(task_id);
                            print("{");
                        }
                    }
                    print("}");
                }else{
                    print("filter == taskauthor, but judge failed.");
                }
            }else if(filter=="taskreward"){
                if(judge=="equal"){
                    print("{");
                    for(int task_id = FIRST_TASK_ID ; task_id <= length ; task_id++){//task_id <= tasks.size()
                        auto thetask = tasks.get(task_id);
                        if(thetask.reward==value){
                            print("{");
                            printask(task_id);
                            print("{");
                        }
                    }
                    print("}");
                }else if(judge=="bigger"){
                    print("{");
                    for(int task_id = FIRST_TASK_ID ; task_id <= length ; task_id++){//task_id <= tasks.size()
                        auto thetask = tasks.get(task_id);
                        if(thetask.reward > value){
                            print("{");
                            printask(task_id);
                            print("{");
                        }
                    }
                    print("}");
                }else if(judge=="nosmaller"){
                    print("{");
                    for(int task_id = FIRST_TASK_ID ; task_id <= length ; task_id++){//task_id <= tasks.size()
                        auto thetask = tasks.get(task_id);
                        if(thetask.reward >= value){
                            print("{");
                            printask(task_id);
                            print("{");
                        }
                    }
                    print("}");
                }else if(judge=="smaller"){
                    print("{");
                    for(int task_id = FIRST_TASK_ID ; task_id <= length ; task_id++){//task_id <= tasks.size()
                        auto thetask = tasks.get(task_id);
                        if(thetask.reward < value){
                            print("{");
                            printask(task_id);
                            print("{");
                        }
                    }
                    print("}");
                }else if(judge=="nobigger"){
                    print("{");
                    for(int task_id = FIRST_TASK_ID ; task_id <= length ; task_id++){//task_id <= tasks.size()
                        auto thetask = tasks.get(task_id);
                        if(thetask.reward <= value){
                            print("{");
                            printask(task_id);
                            print("{");
                        }
                    }
                    print("}");
                }else{
                    print("filter == taskreward, but judge failed.");
                }
            }
            
        }
        
    }


    [[eosio::action]]
    void Task::update(const account_name author, uint64_t id, string& title, string& description, string& status,
    string& rolenumbers, string& reward, string& pledge, string& updatedat, string& requires){// ID is not changeable.
        Task::taskIndex tasks(_self, _self);
        auto iterator = tasks.find(id);
        eosio_assert(iterator != tasks.end(), "This ID of Task DID NOT exist !!!");
        
        tasks.modify(iterator, author, [&](auto& tasks) {
            tasks.title = title;
            tasks.description = description;
            tasks.status = status;
            tasks.rolenumbers = rolenumbers;
            tasks.reward = reward;
            tasks.pledge = pledge;
            tasks.updatedat = updatedat;
            tasks.requires = requires;
        });
        print("{ \"message\" : \" Successfully updated. \"}");
    }

    [[eosio::action]]
    void Task::updatestatus(const account_name author, uint64_t task_id, string& status){
        Task::taskIndex tasks(_self, _self);
        auto iterator = tasks.find(task_id);
        eosio_assert(iterator != tasks.end(), "This ID of Task DID NOT exist !!!");
        
        tasks.modify(iterator, author, [&](auto& tasks) {
            tasks.status = status;
        });
        print("{ \"message\" : \" Successfully updated status. \"}");
    }

    [[eosio::action]]
    void Task::updatevotes(const account_name author, uint64_t task_id, string& likevote, string& hatevote){
        Task::taskIndex tasks(_self, _self);
        auto iterator = tasks.find(task_id);
        eosio_assert(iterator != tasks.end(), "This ID of Task DID NOT exist !!!");
        
        tasks.modify(iterator, author, [&](auto& tasks) {
            tasks.likevote = likevote;
            tasks.hatevote = hatevote;
        });
        print("{ \"message\" : \" Successfully updated votes. \"}");
    }

    //只有发任务者可以更新状态。并且会通知每个参加任务的人。
    //, uint64_t participantid
    [[eosio::action]]
    void Task::participate(const account_name author, uint64_t task_id, string& participantname){
        Task::taskIndex tasks(_self, _self);
        auto iterator = tasks.find(task_id);
        eosio_assert(iterator != tasks.end(), "This ID of Task DID NOT exist !!!");
        
        iterator = tasks.find(task_id);
        tasks.modify(iterator, author, [&](auto& tasks) {
            tasks.participants.push_back(user{
                //participantid,
                participantname
            });
        });
        print("{ \"message\" : \" Successfully participated. \"}");
    }

    [[eosio::action]]
    void Task::erase(const account_name author, uint64_t id){
        
    }

}
