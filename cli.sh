#!/bin/bash

echo $'\n\n------ Hello from `g` CLI ------\n\n'

function start() {
  echo $'Starting containers...'

  docker-compose -f ./docker/docker-compose.yml up
}


#########################
# The command line help #
#########################
function display_help() {
    # echo "Usage: $0 [option...] {start|stop|restart}" >&2
    echo
    echo "   start                      start containers"
    echo
    # echo some stuff here for the -a or --add-options
    exit 1
}

################################
# Check if parameters options  #
# are given on the commandline #
################################
while :
do
    case "$1" in
      -h | --help)
          display_help
          exit 0
          ;;
      start)
          start
          exit 0
          ;;
      --) # End of all options
          shift
          break
          ;;
      -*)
          echo "Error: Unknown option: $1" >&2
          ## or call function display_help
          exit 1
          ;;
      *)  # No more options
          break
          ;;
    esac
done
