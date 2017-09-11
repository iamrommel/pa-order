#! /bin/bash
function confirm()
{
    echo -n "$@ "
    read -e answer
    for response in y Y yes YES Yes Sure sure SURE OK ok Ok
    do
        if [ "_$answer" == "_$response" ]
        then
            return 0
        fi
    done

    # Any answer other than the list above is considerred a "no" answer
    return 1
}

confirm Are you sure you want to deploy?
 if [ $? -eq 0 ]
 then
    version=$(npm version patch)
    echo $version

    git init
    git add .
    git commit -m "Deployed $version to Heroku"
    git push --set-upstream git@heroku.com:pa-order.git master -f
    rm -fr .git

    git commit -a -m "Created tags and Deployed $version"
    git tag "$version"
    git push && git push --tags
    read -rsp $'Done!!! Press enter to exit..' key
fi

